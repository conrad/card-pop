using System.Collections;
using System.Collections.Generic;
using UnityEngine;


/**
 * This class is still in development and unused.
 */ 
public class ObjectScaler : MonoBehaviour
{
//	private float maxScale = 7.0f;
	private float speed = 15.0f;

	private GameObject scalingObject;
//	private Vector3 origPos;
//	private float origScale;
	private HeightMapper heightMapper;


	public ObjectScaler(GameObject gameObject)
	{
		scalingObject = gameObject;
//		origPos = gameObject.transform.position;
//		origScale = gameObject.transform.localScale.y;
		heightMapper = new HeightMapper();
	}


	public void InitiateExpandByAmount(float amount)
	{
		StartCoroutine(ExpandByAmount(amount));
	}


	IEnumerator ExpandByAmount(float amount)
	{
//		float endScale = heightMapper.GetHeightFromAmount(balance);
//		scalingObject.transform.localScale.y = Mathf.MoveTowards(scalingObject.transform.localScale.z, endScale, Time.deltaTime * speed);
//		scalingObject.transform.position = origPos + scalingObject.transform.forward * (scalingObject.transform.localScale.z / 2.0 + origScale / 2.0);

		while (scalingObject.transform.localScale.y < heightMapper.GetHeightFromAmount(amount)) {
			scalingObject.transform.position = new Vector3(
				scalingObject.transform.position.x, 
				scalingObject.transform.position.y + speed,
				scalingObject.transform.position.z
			);

			scalingObject.transform.localScale = new Vector3(
				scalingObject.transform.localScale.x,
				scalingObject.transform.localScale.y + speed,
				scalingObject.transform.localScale.z
			);


			yield return null;
		}
	}


	public void MinimizeObject()
	{
		scalingObject.transform.localScale = new Vector3(0, 0, 0);
	} 
}




//	private float maxScale = 7.0f;
//	private float speed = 15.0f;
//	private Vector3 v3OrgPos;
//	private float orgScale;
//	private float endScale;
//
//	void Start () 
//	{
//		v3OrgPos = transform.position;
//		orgScale = transform.localScale.z;
//		endScale = orgScale;
//	}
//	
//
//	void Update () 
//	{
//		transform.localScale.z = Mathf.MoveTowards(transform.localScale.z, endScale, Time.deltaTime * speed);
//		transform.position = v3OrgPos + transform.forward * (transform.localScale.z / 2.0 + orgScale / 2.0);
//		if(Input.GetKeyDown(KeyCode.S)) {
//			endScale = maxScale;
//		}
//		else if (Input.GetKeyDown(KeyCode.R)) {
//			endScale = orgScale;
//		}
//	}
//}
