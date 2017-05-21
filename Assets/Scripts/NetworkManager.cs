using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;



public class NetworkManager : MonoBehaviour 
{
	void MakeAuthRequest()
	{
		string url = "www.thing.com";
		UnityWebRequest request = new UnityWebRequest(url, "POST");
		request.SetRequestHeader("name", "value");
		//...
	}

}
