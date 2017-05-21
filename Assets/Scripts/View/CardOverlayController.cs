using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CardOverlayController : MonoBehaviour 
{
	public GameObject cardBanner;
	public GameObject currentBalanceBlock;
	public float growthRate = 0.001f;


	private HeightMapper heightMapper;
	private TextMesh bannerText;


	void Start () 
	{
		heightMapper = new HeightMapper();
		bannerText = cardBanner.GetComponent<TextMesh>();
	}


	public void ShowOverlay(Account account)
	{
		StartCoroutine(ExpandCurrentBalance(account.CurrentBalance));
//		StartCoroutine(FadeIn(cardBanner));

		bannerText.text = account.Name;
	}


	IEnumerator ExpandCurrentBalance(float balance)
	{
		while (currentBalanceBlock.transform.localScale.y < heightMapper.GetHeightFromAmount(balance)) {
			currentBalanceBlock.transform.position = new Vector3(
				currentBalanceBlock.transform.position.x, 
				currentBalanceBlock.transform.position.y + growthRate,
				currentBalanceBlock.transform.position.z
			);

			currentBalanceBlock.transform.localScale = new Vector3(
				currentBalanceBlock.transform.localScale.x,
				currentBalanceBlock.transform.localScale.y + growthRate,
				currentBalanceBlock.transform.localScale.z
			);

			yield return null;
		}
	}

	public void MinimizeCurrentBalance()
	{
		currentBalanceBlock.transform.localScale = new Vector3(0, 0, 0);
	}


	IEnumerator FadeIn(GameObject gameObject) 
	{
		MeshRenderer renderer = gameObject.GetComponent<MeshRenderer>();

		for (float f = 0; f <= 1f; f += 0.1f) {
			Color c =   renderer.material.color;
			c.a = f;
			renderer.material.color = c;
			yield return null;
		}
	}


	IEnumerator Fade(GameObject gameObject) 
	{
		MeshRenderer renderer = gameObject.GetComponent<MeshRenderer>();

		for (float f = 1f; f >= 0; f -= 0.1f) {
			Color c =   renderer.material.color;
			c.a = f;
			renderer.material.color = c;
			yield return null;
		}
	}

}
