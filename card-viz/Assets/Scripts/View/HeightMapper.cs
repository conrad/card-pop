using System.Collections.Generic;


public class HeightMapper 
{
	public float GetHeightFromAmount(float amount)
	{
		if (amount < 200f) {
			return 0.05f;
		}
		if (amount < 500f) {
			return 0.1f;
		}
		if (amount < 750f) {
			return 0.15f;
		}
		if (amount < 1000f) {
			return 0.2f;
		}
		if (amount < 1250f) {
			return 0.25f;
		}
		if (amount < 2000f) {
			return 0.3f;
		}
		if (amount < 3000f) {
			return 0.4f;
		}
		if (amount < 4000f) {
			return 0.45f;
		}
		if (amount < 5000f) {
			return 0.5f;
		}
		if (amount < 6000f) {
			return 0.52f;
		}
		if (amount < 7000f) {
			return 0.54f;
		}
		if (amount < 8000f) {
			return 0.56f;
		}
		if (amount < 9000f) {
			return 0.58f;
		}
		if (amount < 100000f) {
			return 0.7f;
		}
		if (amount >= 10000f) {
			return 0.8f;
		}

		return 0.3f;
	}
}
