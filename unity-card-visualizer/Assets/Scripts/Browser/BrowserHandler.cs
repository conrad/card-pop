using UnityEngine;
using System.Collections;

public class BrowserHandler : MonoBehaviour 
{
	/*
	 * Your local files should be placed in StreamingAssets directory
	 * 
	 * This path is relative to it, meaning full path will be 
	 * /StreamingAssets/LocalSite/index.html
	* */
	public string pathToFile = "/LocalSite/index.html";

	public void OnButtonClicked() 
	{
		InAppBrowser.DisplayOptions options = new InAppBrowser.DisplayOptions();
		options.displayURLAsPageTitle = false;
		options.pageTitle = "Card Pop";
		InAppBrowser.OpenLocalFile(pathToFile, options);
	}



	public void CloseBrowser() 
	{
		InAppBrowser.CloseBrowser();
	}
}
