/// <reference path="jsdiag.d.ts" /> 
/// <reference path="jscommon.d.ts" /> 

/// <reference path="JsDiagram-vsdoc.js" />
var DiagramView = MindFusion.Diagramming.DiagramView;

var Diagram = MindFusion.Diagramming.Diagram;
var DiagramLink = MindFusion.Diagramming.DiagramLink;
var ControlNode = MindFusion.Diagramming.ControlNode;

var Rect = MindFusion.Drawing.Rect;
var Point = MindFusion.Drawing.Point;

var Animation = MindFusion.Animations.Animation;
var AnimationType = MindFusion.Animations.AnimationType;
var EasingType = MindFusion.Animations.EasingType;
var AnimationEvents = MindFusion.Animations.Events;

var diagram = null;

document.addEventListener("DOMContentLoaded", function ()
{

   	// create a Diagram component that wraps the "diagram" canvas
	var diagramView = DiagramView.create(document.getElementById("diagram"));
	diagram = diagramView.diagram;
	
	diagram.virtualScroll= true;

	
	// create an Overview component that wraps the "overview" canvas
    var overview = MindFusion.Diagramming.Overview.create(document.getElementById("overview"));
    overview.diagramView = diagramView;	
	
	 // create an ZoomControl component that wraps the "zoomer" canvas
    var zoomer = MindFusion.Controls.ZoomControl.create(document.getElementById("zoomer"));
    zoomer.target = diagramView;
   
    var defaultTemplate = `
<p>Choose a condition1:<p>
<div><select data-interactive="true" data-event-change="selectClick" name="condition1s" id="condition1s">
  <option value="none" selected></option>
  <option value="option1">option1</option>
  <option value="option2">option2</option>
  <option value="option1.3">option1.3</option>
  <option value="option1.4">option1.4</option>
</select>
</div>`;

    diagram.defaultControlTemplate = defaultTemplate;
	
	 var node1 = new MindFusion.Diagramming.ControlNode(diagram);
        node1.template = `
<p>Choose a condition1:<p>
<div><select data-interactive="true" data-event-change="selectClick" name="condition1s" id="condition1s">
  <option value="none" selected></option>
  <option value="option1">option1</option>
  <option value="option2">option2</option>
  <option value="option1.3">option1.3</option>
  <option value="option1.4">option1.4</option>
</select>
</div>`;
        node1.bounds = new Rect(40, 10, 40, 25);
		node1.id = "condition1s";
        diagram.addItem(node1);
		
});



function selectClick(e, sender)
{
	var selectControl = sender.getContent().getElementsByTagName("select")[0];
	
	deleteNode(selectControl.id);
	
	if(selectControl.id == "condition1s")
	{		 
		 if(selectControl.value != "none")
			nextNode(1, sender);
	}
	else if(selectControl.id == "speciality")
	{
		if(selectControl.value != "none")
			nextNode(2, sender);
	}
	else if(selectControl.id == "qualification")
	{
		if(selectControl.value != "none")
			nextNode(3, sender);
	}
	else if(selectControl.id == "urgency")
	{
		if(selectControl.value != "none")
			nextNode(4, sender);
	}
}


	function nextNode(stage, originNode)
	{
		var node = new MindFusion.Diagramming.ControlNode(diagram);
		if(stage == 1)
		{
			node.template = `
			<p>Choose a condition 2:<p>
			<div><select data-interactive="true" data-event-change="selectClick" name="speciality" id="speciality">
			  <option value="none" selected></option>			  
			  <option value="option2.1">option2.1</option>
			  <option value="option2.2">option2.2</option>
			  <option value="option2.3">option2.3</option>
			  <option value="option2.4">option2.4</option>
			  <option value="option2.5">option2.5</option>
			  <option value="option2.6">option2.6</option>
			</select>
			</div>`;		
			
			node.bounds = new Rect(30, 60, 60, 25);
			node.locked = true;
			node.visible = false;
			node.id = "speciality";
			diagram.addItem(node);	
			
			createAnimatedLink(originNode, node);	
		
		}
		else if(stage == 2)
		{
			node.template = `
			<p>Choose a condition 3:<p>
			<div><select data-interactive="true" data-event-change="selectClick" name="qualification" id="qualification">
			  <option value="none" selected></option>			  
			  <option value="option3.1">option3.1</option>
			  <option value="option3.2">option3.2</option>
			  <option value="option3.3">option3.3</option>
			  <option value="option3.4">option3.4</option>
			</select>
			</div>`;		
			
			node.bounds = new Rect(30, 110, 60, 25);
			node.locked = true;
			node.visible = false;
			node.id = "qualification";
			diagram.addItem(node);	
            createAnimatedLink(originNode, node);				
		}
		else if(stage == 3)
		{
			node.template = `
			<p>choose a condition 4:<p>
			<div><select data-interactive="true" data-event-change="selectClick" name="urgency" id="urgency">
			  <option value="none" selected></option>			  
			  <option value="option1">option1</option>
			  <option value="option2">option2</option>
			  <option value="option3">option3</option>
			  <option value="option4">option4</option>
			</select>
			</div>`;		
			
			node.bounds = new Rect(40, 160, 40, 25);		
			node.locked = true;
			node.visible = false;
			node.id = "urgency";
			diagram.addItem(node);	

		    createAnimatedLink(originNode, node);			
		}
		else if(stage == 4)
		{
			let errorMessage = "";
		
			//filter all option3.3s by condition1
		    var filter = document.getElementById("condition1s").value;
			
			var availablePractitioners = practitioners.filter(function (p) {
             return p.condition1 === filter;
			  });
			  
			
			  
			  if(availablePractitioners.length == 0)
				  errorMessage = "Sorry";
			 
			 //filter the result by speciality
			 filter = document.getElementById("speciality").value;
			 
			 var temp = availablePractitioners;
			 availablePractitioners = temp.filter(function (p) {
             return p.speciality === filter;
			  });
			  
			
			  if(availablePractitioners.length == 0)
				  errorMessage = "Sorry";
			 
			//filter by degree
			 filter = document.getElementById("qualification").value;
			 
			 temp = availablePractitioners;
			 availablePractitioners = temp.filter(function (p) {
             return p.rank === filter;
			  });
			  
	
			  
			    if(availablePractitioners.length == 0)
				  errorMessage = "Sorry";
			 
			 //filter by urgency
			 filter = document.getElementById("urgency").value;
			 
			 temp = availablePractitioners;
			 availablePractitioners = temp.filter(function (p) {
             return p.time === filter;
			  });
			 

			 if(availablePractitioners.length == 0)
				  errorMessage = "Sorry";
			 
			 if(errorMessage != "")						
			 {
				 node.template = '<p>' + errorMessage + '<p>';
				 node.bounds = new Rect(40, 210, 40, 25);	
				 node.visible = false;				
				 diagram.addItem(node);
				 createAnimatedLink(originNode, node);
			 }			 	
			else
			{
				
				var layout = new MindFusion.Graphs.TreeLayout();
				layout.root = node;
				layout.direction = MindFusion.Graphs.LayoutDirection.TopToBottom;
				layout.keepRootPosition = true;
				layout.levelDistance = 10;
				linkType = MindFusion.Graphs.TreeLayoutLinkType.Cascading;
				
				for(var i = 0; i < availablePractitioners.length; i++)
				{
					node = new MindFusion.Diagramming.ControlNode(diagram);
					node.template = '<p align="center" style="font-weight:bold; font-size: 124x;">' + availablePractitioners[i].name.first + " " + availablePractitioners[i].name.last + '<p>' + 
					'<p align="center"><img src="images/' + availablePractitioners[i].photo + '" width="100" height="120"/></p><table><tr><td>weight: </td><td>' + 
					availablePractitioners[i].weight + '</td></tr><tr><td>height: </td><td>' + 
					availablePractitioners[i].height + '</td></tr><tr><td>bmi: </td><td>' + 
					availablePractitioners[i].bmi + '</td></tr></table>';
					node.bounds = new Rect(40, 210, 75, 70);						
					node.stroke =  '#003466';	
					node.id = "last";
					diagram.addItem(node);	
					var link = new DiagramLink(diagram, originNode, node);
					link.headShape = 'Triangle';
					link.headBrush = '#003466';
					link.stroke =  '#003466';
					link.locked = true;
					diagram.addItem(link);	
					
				}				
				
				diagram.arrange(layout);
				diagram.resizeToFitItems(10);
			//	diagram.zoomToFit();
				
			}				
					
		}
		
	}
	
	function createAnimatedLink(originNode, node)
	{
		var link = new DiagramLink(diagram, originNode, node);
				link.headShape = 'Triangle';
				link.headBrush = '#003466';
				link.stroke =  '#003466';
				link.locked = true;
				diagram.addItem(link);
				
				var ep = link.endPoint;
				link.endPoint = link.startPoint;
				var animation = new Animation(link, { fromValue: link.startPoint, toValue: ep, animationType: AnimationType.Bounce, easingType: EasingType.EaseOut, duration: 1000 }, onUpdateLink);
				
				animation.addEventListener(AnimationEvents.animationComplete, function (sender, args)
				{
			
					node.visible = true;
					
					
				});
				
				animation.start();
	}
	
function deleteNode(id)
{
	
	var nodes = diagram.nodes.filter(function (p) {
             return p.id === id;
			  });
			  
	
	if(nodes.length > 0)
	{	
		deleteRecursively(nodes[0].outgoingLinks);		
	}
}

function deleteRecursively(links)
{
	
	for(var i = links.length-1; i >= 0; i--)
	{
		var node = links[i].destination;
		
		var nlinks = node.outgoingLinks;		
		deleteRecursively(nlinks);
		diagram.removeItem(node);
			
		
	}
}
	
	// a custom update callback for link animations
function onUpdateLink(animation, animationProgress)
{
	var link = animation.item;
	var pointA = animation.fromValue,
		pointB = animation.toValue;

	link.endPoint = 
		new Point(
			pointA.x + (pointB.x - pointA.x) * animationProgress,
			pointA.y + (pointB.y - pointA.y) * animationProgress);
	link.invalidate();
}


	


