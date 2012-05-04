/*this document contains all the tests for Responsive Everything.

//---------------------
// unescaped pattern 
//---------------------
(<[^>]+?)((?:height|width)[=:]["']?\d+["';]\s?)(.*?>)

*/


var imgAttrPattGetOpeningImageTag = "(<[^>]+?)";
var imgAttrPattGetHeightOrWidthAttribute = "((?:height|width)[=:][\"']?\d+[\"';]\s?)";
var imgAttrPattGetClosingImageTag = "(.*?>)";

var imgAttrPattConcatenated = imgAttrPattGetOpeningImageTag+imgAttrPattGetHeightOrWidthAttribute+imgAttrPattGetClosingImageTag;

var imgAttributePattern=new RegExp(imgAttrPattConcatenated,"gi");


/*------------------------------------------------------
/ Simulate Module
------------------------------------------------------*/
module("Test img attribute replacement");

test("Do nothing", function(){
	testString = "<img src='foo' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src");
	testString = "<img src='foo' class='bar' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' class='bar' />", "just src & class");
	testString = "<img src=\"foo\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" />", "just src with double quotes");
	testString = "<img src=\"foo\" class=\"bar\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" class=\"bar\" />", "just src & class with double quotes");
});
test("Replace only width", function(){
	testString = "<img src='foo' width='100' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src & width");
	testString = "<img src='foo' width='100'/>";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src & width with less whitespace");
	testString = "<img src='foo' width='100' class='bar' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' class='bar' />", "src, width, & class");
	testString = "<img src=\"foo\" width=\"100\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" />", "just src & width with double quotes");
	testString = "<img src=\"foo\" width=\"100\" class=\"bar\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" class=\"bar\" />", "src, width, & class with double quotes");
});
test("Replace only height", function(){
	testString = "<img src='foo' height='100' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src & height");
	testString = "<img src='foo' height='100'/>";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src & height with less whitespace");
	testString = "<img src='foo' height='100' class='bar' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' class='bar' />", "src, height, & class");
	testString = "<img src=\"foo\" height=\"100\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" />", "just src & height with double quotes");
	testString = "<img src=\"foo\" height=\"100\" class=\"bar\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" class=\"bar\" />", "src, height, & class with double quotes");
});
test("Replace only first attribute", function(){
	testString = "<img src='foo' height='100' width='200' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' width='200' />", "just src & attributes");
	testString = "<img src='foo' height='100' width='200'/>";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' width='200'/>", "just src & attributes with less whitespace");
	testString = "<img src='foo' width='200' height='100' class='bar' />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src='foo' height='100' class='bar' />", "src, attributes, & class");
	testString = "<img src=\"foo\" width=\"200\" height=\"100\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" height=\"100\" />", "just src & attributes with double quotes");
	testString = "<img src=\"foo\" width=\"200\" height=\"100\" class=\"bar\" />";
    equal(testString.replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" height=\"100\" class=\"bar\" />", "src, attributes, & class with double quotes");
});
test("Replace both attributes", function(){
	testString = "<img src='foo' height='100' width='200' />";
    equal(testString.replace(imgAttributePattern,"$1$3").replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src & attributes");
	testString = "<img src='foo' height='100' width='200'/>";
    equal(testString.replace(imgAttributePattern,"$1$3").replace(imgAttributePattern,"$1$3"), "<img src='foo' />", "just src & attributes with less whitespace");
	testString = "<img src='foo' width='200' height='100' class='bar' />";
    equal(testString.replace(imgAttributePattern,"$1$3").replace(imgAttributePattern,"$1$3"), "<img src='foo' class='bar' />", "src, attributes, & class");
	testString = "<img src=\"foo\" width=\"200\" height=\"100\" />";
    equal(testString.replace(imgAttributePattern,"$1$3").replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" />", "just src & attributes with double quotes");
	testString = "<img src=\"foo\" width=\"200\" height=\"100\" class=\"bar\" />";
    equal(testString.replace(imgAttributePattern,"$1$3").replace(imgAttributePattern,"$1$3"), "<img src=\"foo\" class=\"bar\" />", "src, attributes, & class with double quotes");
});

/*
<img src="foo" />
<img src="foo" class="bar" />
<img src="foo" height="100" />
<img src="foo" width="200" />
<img src="foo" height="100" width="200" />
<img src="foo" width="200" height="100" />
<img src='foo' height='100' />
<img src='foo' width='200' />
<img src='foo" height='100' width='200' />
<img src="foo" width='200' height='100' />
<img src="foo" width='200" height='100" />
<img src="foo" width="200' height="100' />
<img src="foo" width='200" height="100' />
<img src="foo" width="200' height='100" />
<img src="foo" width="200" class="bar" height="100" />
*/

/*------------------------------------------------------
/ Calculate Averages Module
------------------------------------------------------*/
/*
module("Test div style properties replacement");

test("Auto Wounds", function(){
	diceRoll = new AleaSimulata({toHit:1,toWound:1,toSave:7,attacks:1});
    equals(diceRoll.calcAvg(), 1, "Auto hit, auto wound, no save.");
	diceRoll = new AleaSimulata({toHit:1,toWound:1,toSave:7,attacks:100});
    equals(diceRoll.calcAvg(), 100, "Auto hit, auto wound, no save. 100X.");
});
test("No Wounds", function(){
	diceRoll = new AleaSimulata({toHit:7,toWound:1,toSave:7,attacks:10});
    equals(diceRoll.calcAvg(), 0, "Can't hit.");
	diceRoll = new AleaSimulata({toHit:1,toWound:7,toSave:7,attacks:10});
    equals(diceRoll.calcAvg(), 0, "Can't wound");
	diceRoll = new AleaSimulata({toHit:1,toWound:1,toSave:1,attacks:10});
    equals(diceRoll.calcAvg(), 0, "Auto save");
});
*/