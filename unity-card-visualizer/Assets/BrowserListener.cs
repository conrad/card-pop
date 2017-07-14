using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BrowserListener : MonoBehaviour {

	public string javaScriptCode = "alert('pong!')";

	void Start() {
		InAppBrowserBridge bridge = FindObjectOfType<InAppBrowserBridge>();
		bridge.onJSCallback.AddListener(OnMessageFromJS);
	}

	void OnMessageFromJS(string jsMessage) {
		Debug.Log(jsMessage);

		if (jsMessage.Equals("close-browser")) {
			InAppBrowser.CloseBrowser();
		}
	}
}
