import React, { useState, useEffect } from "react";
import api from "../../../api/axios";

type Unit = {
  houseNumber: string;
  name: string;
  houseType: string;
  status: string;
  rent: number;
};

const Units = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  // State for adding a new unit
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUnit, setNewUnit] = useState<Omit<Unit, "status">>({
    houseNumber: "",
    name: "",
    houseType: "",
    rent: 0,
  });
  const [addLoading, setAddLoading] = useState(false);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const res = await api.get('/units');
      setUnits(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch units.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleConfirm = async (houseNumber: string) => {
    setConfirming(houseNumber);
    try {
      await api.post(`/units/${houseNumber}/confirm`, {});
      setUnits((prev) =>
        prev.map((u) =>
          u.houseNumber === houseNumber ? { ...u, status: "confirmed" } : u
        )
      );
    } catch (err) {
      setError("Failed to confirm unit.");
    } finally {
      setConfirming(null);
    }
  };

  // Add new unit handler
  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setError(null);
    try {
      const res = await api.post('/units', {
        ...newUnit,
        status: "available",
      });
      setUnits((prev) => [...prev, res.data]);
      setShowAddForm(false);
      setNewUnit({ houseNumber: "", name: "", houseType: "", rent: 0 });
    } catch (err) {
      setError("Failed to add unit.");
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-max">
      <h1 className="text-3xl font-bold text-center mb-6">Units</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? "Cancel" : "Add Unit"}
        </button>
      </div>
      {showAddForm && (
        <form
          onSubmit={handleAddUnit}
          className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-md mx-auto"
        >
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">House Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={newUnit.houseNumber}
              onChange={(e) =>
                setNewUnit((u) => ({ ...u, houseNumber: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={newUnit.name}
              onChange={(e) =>
                setNewUnit((u) => ({ ...u, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">House Type</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={newUnit.houseType}
              onChange={(e) =>
                setNewUnit((u) => ({ ...u, houseType: e.target.value }))
              }
              required
            >
              <option value="">Select type</option>
              <option value="bed-sitter">Bed-sitter</option>
              <option value="1-bedroom">1-bedroom</option>
              <option value="2-bedroom">2-bedroom</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Rent</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={newUnit.rent}
              onChange={(e) =>
                setNewUnit((u) => ({ ...u, rent: Number(e.target.value) }))
              }
              required
              min={0}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            disabled={addLoading}
          >
            {addLoading ? "Adding..." : "Add Unit"}
          </button>
        </form>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <div
            key={unit.houseNumber}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{unit.houseNumber}</h2>
            <p className="text-gray-600">{unit.houseType}</p>
            <span className="block mb-1">Status: {unit.status}</span>
            <span className="block mb-2">Rent: {unit.rent}</span>
            {unit.status !== "confirmed" && (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 mr-2"
                  disabled={confirming === unit.houseNumber}
                  onClick={() => handleConfirm(unit.houseNumber)}
                >
                  {confirming === unit.houseNumber ? "Confirming..." : "Confirm"}
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                  onClick={async () => {
                    const newName = prompt("Enter new Name", unit.name);
                    if (!newName || newName === unit.name) return;
                    try {
                      setConfirming(unit.houseNumber);
                      await api.put(
                        `/units/${unit.houseNumber}`,
                        { name: newName }
                      );
                      setUnits((prev) =>
                        prev.map((u) =>
                          u.houseNumber === unit.houseNumber ? { ...u, name: newName } : u
                        )
                      );
                    } catch (err) {
                      setError("Failed to update unit.");
                    } finally {
                      setConfirming(null);
                    }
                  }}
                  disabled={confirming === unit.houseNumber}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Units;