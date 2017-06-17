public class Account
{
	public Account(int id, string name, float currentBalance) 
	{
		Id = id;
		Name = name;
		CurrentBalance = currentBalance;
	}


	public float Id { get; set; }
	public string Name { get; set; }
	public float CurrentBalance { get; set; }
}
