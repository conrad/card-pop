using System.Collections;
using System.Collections.Generic;
using UnityEngine;



public class CardDataService
{
	ITargetCardMapper targetCardMapper;

	// TODO: Implement request to backend and deserialize JSON.
//	public UserItems fetchUserData()
//	{
//		
//	}

	public CardDataService(ITargetCardMapper TargetCardMapper)
	{
		targetCardMapper = TargetCardMapper;
	}



	public CreditCardAccount GetAccountFromTargetName(string targetName)
	{
		// TODO:
		// get account id from target name
		// cycle through accounts in each item for match
		// return the account balance 

		// default for now.

		Debug.Log("trying to match: " + targetName);

		return new CreditCardAccount(
			1,
			targetCardMapper.MapCardFromTarget(targetName), 
			2332.33f,
			1111.11f,
			43444.44f
		);
	}

}
