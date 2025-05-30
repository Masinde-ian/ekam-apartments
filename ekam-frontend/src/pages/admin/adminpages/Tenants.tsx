import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

interface Tenant {
  _id: string;
  fullName: string;
  contactNumber: string;
  email: string;
  leaseStart: string;
  leaseEnd: string;
  unit: string; // Unit ObjectId
  status: string;
}

interface Unit {
  _id: string;
  name?: string;
  houseNumber?: string;
  houseType?: string;
}

const Tenants: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  
  const [newTenant, setNewTenant] = useState<Omit<Tenant, "_id" | "status">>({
    fullName: "",
    contactNumber: "",
    email: "",
    leaseStart: "",
    leaseEnd: "",
    unit: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsRes, unitsRes] = await Promise.all([
          api.get('/tenants'),
          api.get('/units')
        ]);
        
        setTenants(tenantsRes.data);
        setUnits(unitsRes.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Delete tenant handler
  const handleDeleteTenant = async (tenantId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tenant?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/tenants/${tenantId}`);
      setTenants(prev => prev.filter(t => t._id !== tenantId));
    } catch (err) {
      setError("Failed to delete tenant. Please try again.");
      console.error("Delete tenant error:", err);
    }
  };

  // Add new tenant handler
  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/tenants', {
        ...newTenant,
        status: "active" // Default status
      });
      
      setTenants(prev => [...prev, response.data]);
      setShowAddForm(false);
      setNewTenant({
        fullName: "",
        contactNumber: "",
        email: "",
        leaseStart: "",
        leaseEnd: "",
        unit: "",
      });
    } catch (err) {
      setError("Failed to add tenant. Please check your input and try again.");
      console.error("Add tenant error:", err);
    } finally {
      setAddLoading(false);
    }
  };

  const getUnitDisplay = (unitId: string): string => {
    const unit = units.find(u => u._id === unitId);
    if (!unit) return "Not assigned";
    
    return [
      unit.houseNumber,
      unit.name,
      unit.houseType
    ].filter(Boolean).join(" - ") || unitId.slice(-6); // Fallback to short ID
  };

  if (loading) return <div className="p-6">Loading tenants...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tenants</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={() => setShowAddForm(prev => !prev)}
        >
          {showAddForm ? "Cancel" : "Add Tenant"}
        </button>
      </div>

      {/* Add Tenant Form */}
      {showAddForm && (
        <form onSubmit={handleAddTenant} className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Add New Tenant</h3>
          
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Contact Number", name: "contactNumber", type: "tel" },
            { label: "Email", name: "email", type: "email" },
            { label: "Lease Start", name: "leaseStart", type: "date" },
            { label: "Lease End", name: "leaseEnd", type: "date" },
          ].map((field) => (
            <div key={field.name} className="mb-3">
              <label className="block text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={newTenant[field.name as keyof typeof newTenant]}
                onChange={(e) => setNewTenant(prev => ({
                  ...prev,
                  [field.name]: e.target.value
                }))}
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Unit</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={newTenant.unit}
              onChange={(e) => setNewTenant(prev => ({
                ...prev,
                unit: e.target.value
              }))}
              required
            >
              <option value="">Select a unit</option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {getUnitDisplay(unit._id)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full disabled:opacity-50"
            disabled={addLoading}
          >
            {addLoading ? "Adding..." : "Add Tenant"}
          </button>
        </form>
      )}

      {/* Tenants Table */}
      <div className="overflow-x-auto rounded-lg shadow w-auto md:w-fit">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Full Name", "Contact", "Email", "Lease Start", "Lease End", "Unit", "Status", "Actions"].map((header) => (
                <th key={header} className="py-3 px-6 text-left text-gray-700 uppercase text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{tenant.fullName}</td>
                <td className="py-3 px-6">{tenant.contactNumber}</td>
                <td className="py-3 px-6">{tenant.email}</td>
                <td className="py-3 px-6">
                  {tenant.leaseStart ? new Date(tenant.leaseStart).toLocaleDateString() : "-"}
                </td>
                <td className="py-3 px-6">
                  {tenant.leaseEnd ? new Date(tenant.leaseEnd).toLocaleDateString() : "-"}
                </td>
                <td className="py-3 px-6">{getUnitDisplay(tenant.unit)}</td>
                <td className="py-3 px-6">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tenant.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {tenant.status}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDeleteTenant(tenant._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tenants;