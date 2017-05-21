using System.Collections.Generic;


public class HeightMapper 
{
	public float GetHeightFromAmount(float amount)
	{
		if (amount < 200f) {
			return 0.1f;
		}
		if (amount < 500f) {
			return 0.2f;
		}
		if (amount < 100000f) {
			return 0.9f;
		}
		if (amount >= 10000f) {
			return 1f;
		}

		return 0.3f;
	}
}
