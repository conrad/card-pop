using System.Collections.Generic;


public class StaticTargetCardMapper : ITargetCardMapper
{
	private IDictionary<string, string> dict = new Dictionary<string, string>();

	public const string UNKNOWN_CARD = "Unknown Card";

	public StaticTargetCardMapper() 
	{
		// TODO: Implement request to data table of these mappings.
		dict.Add("Chase-Sapphire-Preferred-cropped", "Chase Sapphire Preferred");
		dict.Add("Chase-Sapphire-Reserve-cropped", "Chase Sapphire Reserve");
		dict.Add("Chase-Freedom-Unlimited-cropped", "Chase Freedom Unlimited");
		dict.Add("Chase-Amazon-Reward-cropped", "Chase Amazon Rewards");

		dict.Add("Charles-Schwab-Debit-cropped", "Charles Schwab Debit");
	}



	public string MapCardFromTarget(string target)
	{
		if (dict.ContainsKey(target)) {
			return dict[target];
		}

		return UNKNOWN_CARD;
	}
}
