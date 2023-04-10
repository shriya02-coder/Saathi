var margin = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
},
width = margin.right - margin.left,
height =  margin.top - margin.bottom;

var root ={"name":"Start","text":"\n\nWhat to look for?\n[[BMI>18.5]]\n[[BMI<18.5]]","children":[{"name":"BMI>18.5","text":"\n1.[[Color]] \n2.[[Foam]]\n3.[[Viscosity]]  \n4.[[PH]]","children":[{"name":"condition 1","text":"","children":[{"name":"condition a","text":"","children":[{"name":"Prescription ready..."}]},{"name":"condition b","text":"","children":[{"name":"Prescription ready..."}]},{"name":"condition c","text":"","children":[{"name":"Prescription ready..."}]}]},{"name":"condition 2","text":"\n[[Yes]]\n[[No]]","children":[{"name":"condition d","text":"","children":[{"name":"Prescription ready..."}]},{"name":"condition e","text":"\n[[Yes->Positive]]\n[[No->Nope]]","children":[{"name":"condition t","text":"","children":[{"name":"Prescription ready..."}]},{"name":"condition u","text":"","children":[{"name":"Prescription ready..."}]}]}]},{"name":"condition 3","text":"","children":[{"name":"Prescription ready..."}]},{"name":"condition 4","text":"\n[[PH < 7.0]]\n[[PH > 7.0]]","children":[{"name":"condition g","children":
[{"name":"Prescription ready..."}]},{"name":"condition h","children":[{"name":"Prescription ready..."}]}]}]},{"name":"BMI<18.5","children":[{"name":"condition 5","text":"To perform this reaction one needs instruments.Physical properties is a better option.","children":[{"name":"Prescription ready..."}]},{"name":"condition 6","children":
[{"name":"Prescription ready..."}]},{"name":"condition 7","text":"","children":[{"name":"Prescription ready..."}]}]}]}

var i = 0,
    duration = 750,
    rectW = 100,
    rectH = 60;

var tree = d3.layout.tree().nodeSize([110, 110]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.x + rectW / 2, d.y + rectH / 2];
});

var svg = d3.select("#body").append("svg").attr("width", 100000).attr("height", 100000)
    .call(zm = d3.behavior.zoom().scaleExtent([1,3]).on("zoom", redraw)).append("g")
    .attr("transform", "translate(" + 550 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([100, 20]);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

root.children.forEach(collapse);
update(root);

d3.select("#body").style("height", "800px")

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 120;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
    })
        .on("click", click);

    nodeEnter.append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeEnter.append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
        return d.name;
    });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    nodeUpdate.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();

    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
    //.attr("width", bbox.getBBox().width)""
    //.attr("height", bbox.getBBox().height)
    .attr("stroke", "black")
        .attr("stroke-width", 1);

    nodeExit.select("text");

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("d", function (d) {
        var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

//Redraw for zoom
function redraw() {
  //console.log("here", d3.event.translate, d3.event.scale);
  svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}