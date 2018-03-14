function gendata(count){
    const max = 50;
    var l = [];
    for(var i = 0; i < count; i++) {
        var val_ = Math.floor(Math.random() * max);
        var val = val_ > 10? val_ : 10;
        l.push(val);
    }
    return l;
}

const count = 12;
var dataset = gendata(count);
const w = 20;
const height = 303;
const minH = 30
var scaleToSaturation = d3.scaleLinear().domain([d3.min(dataset), d3.max(dataset)]).range([0, 100]);
var scaleToHeight = d3.scaleLinear().domain([d3.min(dataset), d3.max(dataset)]).range([minH, height - 3])

var svg = d3.select('#app').
    append('svg').
    attr('width', count * (w+1)).
    attr('height', height).
    style('border-bottom', 'solid red 1px').
    style('border-top', 'dotted lightblue 1px');

svg.selectAll('rect').
    data(dataset).
    enter().
    append('rect').
    attr('x', (d, i) => {
        return i * (w + 1) + 1;
    }).
    attr('y', (d) => {
        return height - scaleToHeight(d);
    }).
    attr('width', w).
    attr('height', d=>{ return scaleToHeight(d);}).
    attr('fill', d=> {
        val = scaleToSaturation(d);
        return `hsl(180, ${Math.floor(val)}%, 60%)`;
    });

svg.selectAll('text').
    data(dataset).
    enter().
    append('text').
    attr('x', (d, i) => {
        return i * (w + 1) + 1;
    }).
    attr('y', (d) => {
        return height - scaleToHeight(d) + 12;
    }).
    text(d=> {return d;}).
    attr('font-size', '15px').
    attr('fill', 'blue');

