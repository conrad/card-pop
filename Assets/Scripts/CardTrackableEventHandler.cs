using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Vuforia;

public class CardTrackableEventHandler : MonoBehaviour, ITrackableEventHandler 
{
	public CardOverlayController cardOverlayController;

	#region PRIVATE_MEMBER_VARIABLES

	private TrackableBehaviour mTrackableBehaviour;
	private StateManager sm;
	private CardDataService cardDataService;

	#endregion // PRIVATE_MEMBER_VARIABLES

	const string UNKNOWN_TARGET = "Unknown Target";


	#region UNTIY_MONOBEHAVIOUR_METHODS

	void Start()
	{
		sm = TrackerManager.Instance.GetStateManager();
		cardDataService = new CardDataService(new StaticTargetCardMapper());

		mTrackableBehaviour = GetComponent<TrackableBehaviour>();
		if (mTrackableBehaviour)
		{
			mTrackableBehaviour.RegisterTrackableEventHandler(this);
		}
	}

	#endregion // UNTIY_MONOBEHAVIOUR_METHODS



	#region PUBLIC_METHODS

	// Implementation of the ITrackableEventHandler function called when the tracking state changes.
	public void OnTrackableStateChanged(
		TrackableBehaviour.Status previousStatus,
		TrackableBehaviour.Status newStatus)
	{
		if (newStatus == TrackableBehaviour.Status.DETECTED ||
			newStatus == TrackableBehaviour.Status.TRACKED ||
			newStatus == TrackableBehaviour.Status.EXTENDED_TRACKED)
		{
			OnTrackingFound();
		}
		else
		{
			OnTrackingLost();
		}
	}

	#endregion // PUBLIC_METHODS



	#region PRIVATE_METHODS


	private void OnTrackingFound()
	{
		Renderer[] rendererComponents = GetComponentsInChildren<Renderer>(true);
		Collider[] colliderComponents = GetComponentsInChildren<Collider>(true);

		// Enable rendering:
		foreach (Renderer component in rendererComponents)
		{
			component.enabled = true;
		}

		// Enable colliders:
		foreach (Collider component in colliderComponents)
		{
			component.enabled = true;
		}

		CreditCardAccount creditCardAccount = cardDataService.GetAccountFromTargetName(mTrackableBehaviour.TrackableName);

		cardOverlayController.ShowOverlay(creditCardAccount);

		Debug.Log("Card Trackable " + mTrackableBehaviour.TrackableName + " found");
	}



	private void OnTrackingLost()
	{
		Renderer[] rendererComponents = GetComponentsInChildren<Renderer>(true);
		Collider[] colliderComponents = GetComponentsInChildren<Collider>(true);

		// Disable rendering:
		foreach (Renderer component in rendererComponents)
		{
			component.enabled = false;
		}

		// Disable colliders:
		foreach (Collider component in colliderComponents)
		{
			component.enabled = false;
		}

//		cardOverlayController.MinimizeCurrentBalance();

		Debug.Log("Trackable " + mTrackableBehaviour.TrackableName + " lost");
	}



	private string GetTargetName()
	{
		IEnumerable<TrackableBehaviour> activeTrackables = sm.GetActiveTrackableBehaviours();

		foreach (TrackableBehaviour tb in activeTrackables) {
			return tb.TrackableName;
		}

		return UNKNOWN_TARGET;
	}


	#endregion // PRIVATE_METHODS
}
