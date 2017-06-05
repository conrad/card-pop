using UnityEditor;
using NUnit.Framework;
using NSubstitute;
using System.Collections.Generic;


public class StaticTargetCardMapperTest 
{
	StaticTargetCardMapper mapper;


	[TestFixtureSetUp]
	public void Init() {
		//Init runs once before running test cases.
		mapper = new StaticTargetCardMapper();
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
	public void TestGibberishReturnsUnknown()
	{
		Assert.AreEqual(StaticTargetCardMapper.UNKNOWN_CARD, mapper.MapCardFromTarget("jkwrekjhsfkjgdfnbsasadsf"));
	}


	[Test]
	public void TestChaseMappings()
	{
		Assert.AreEqual("Chase Sapphire Preferred", mapper.MapCardFromTarget("Chase-Sapphire-Preferred-cropped"));
		Assert.AreEqual("Chase Sapphire Reserve", mapper.MapCardFromTarget("Chase-Sapphire-Reserve-cropped"));
	}


	[Test]
	public void TestSchwabMappings()
	{
		Assert.AreEqual("Charles Schwab Debit", mapper.MapCardFromTarget("Charles-Schwab-Debit-cropped"));
	}
}

