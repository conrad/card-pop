using UnityEditor;
using NUnit.Framework;
using NSubstitute;
using System.Collections.Generic;
//using System.Collections;
//using System.Collections.Generic;
//using UnityEngine;


public class CardDataServiceTest 
{
	CardDataService cardDataService;

	const string TEST_CARD = "BofA Today Card";

	[TestFixtureSetUp]
	public void Init() {
		//Init runs once before running test cases.
		cardDataService = new CardDataService(GetMockITargetCardMapper());
	}

	[TestFixtureTearDown]
	public void CleanUp() {
		//CleanUp runs once after all test cases are finished.
	}

	[SetUp]
	public void SetUp() {
		//SetUp runs before all test cases
	}

	[TearDown]
	public void TearDown() {
		//SetUp runs after all test cases
	}

//	[Test]
//	public void SolutionItemsMustBeDistinct() {
//		HashSet<int> hashSet = new HashSet<int> ();
//		for (int i = 0; i < 10; i++) {
//			int[] solution = GameLogic.CreateRandomSolution(new RandomNumberGenerator());
//			foreach (int sol in solution) {
//				hashSet.Add(sol);
//			}
//			Assert.AreEqual(4, hashSet.Count);
//		}
//	}

	[Test]
	public void TestSomething()
	{
		Assert.IsTrue(true);
	}

	private ITargetCardMapper GetMockITargetCardMapper()
	{
		ITargetCardMapper mapper = Substitute.For<ITargetCardMapper>();

		mapper.MapCardFromTarget("anything").Returns(TEST_CARD); 

		return mapper;
	}

}
