using System.Collections.Generic;


public class TargetCardMapper 
{
	private IDictionary<string, string> dict = new Dictionary<string, string>();

	const string UNKNOWN_CARD = "Unknown Card";

	public TargetCardMapper() 
	{
		// TODO: Implement request to data table of these mappings.
		dict.Add("Chase-Sapphire-Preferred-cropped", "Chase Sapphire Preferred");
	}



	public string MapCardFromTarget(string target)
	{
		if (dict.ContainsKey(target)) {
			return dict[target];
		}

		return UNKNOWN_CARD;
	}
}
