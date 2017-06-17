using UnityEngine;
using System.Collections;

public class BrowserOpener : MonoBehaviour {

	public string pageToOpen = "http://www.google.com";

	// check readme file to find out how to change title, colors etc.
	public void OnButtonClicked() {
		InAppBrowser.DisplayOptions options = new InAppBrowser.DisplayOptions();
		options.displayURLAsPageTitle = false;
		options.pageTitle = "InAppBrowser example";

//		Application.OpenURL(pageToOpen);
		InAppBrowser.OpenURL(pageToOpen, options);
		Debug.Log("opening?");
	}

	public void OnClearCacheClicked() {
		InAppBrowser.ClearCache();
	}
}
