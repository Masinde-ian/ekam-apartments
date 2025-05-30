// routes/payments.js
router.post('/:id/confirm', async (req, res) => {
  const payment = await Payment.findByIdAndUpdate(
    req.params.id,
    { status: 'confirmed' },
    { new: true }
  );
  // Optionally, create a notification here
  await Notification.create({
    tenantId: payment.tenantId,
    message: `Admin confirmed your payment for ${payment.month}.`,
    date: new Date()
  });
  res.json(payment);
});