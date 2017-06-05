public class CreditCardAccount : Account
{
	public CreditCardAccount(
		int id,
		string name,
		float currentBalance,
		float availableBalance,
		float creditLimit
	) : base(id, name, availableBalance)
	{
		CurrentBalance = currentBalance;
		CreditLimit = creditLimit;
	}

	public float AvailableBalance { get; set; }
	public float CreditLimit { get; set; }
}
