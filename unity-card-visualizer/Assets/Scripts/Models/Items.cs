using System.Collections.Generic;
using System;



[Serializable]
public class Balances
{
	public double available { get; set; }
	public double current { get; set; }
	public double limit { get; set; }
}


[Serializable]
public class CreditCard
{
	public string account_id { get; set; }
	public Balances balances { get; set; }
	public string mask { get; set; }
	public string name { get; set; }
	public object official_name { get; set; }
	public string subtype { get; set; }
	public string type { get; set; }
}


[Serializable]
public class Item
{
	public List<CreditCard> creditCard { get; set; }
}


[Serializable]
public class UserItems
{
	public List<Item> item { get; set; }
}



//string json = JsonUtility.ToJson(myObject);
//myObject = JsonUtility.FromJson<MyClass>(json);
//JsonUtility.FromJsonOverwrite(json, myObject);
// OR
//Convert your JSON to C# using json2csharp.com;
//Create a class file and put the above generated code in there;
//Add the Newtonsoft.Json library to your project using the Nuget Package Manager;
//Convert the JSON received from your service using this code:
//RootObject r = JsonConvert.DeserializeObject<RootObject>(json);
