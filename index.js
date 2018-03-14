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
const w = 20;
const height = 303;
const minH = 30

function DataSetProxy(){
    this.dataset = gendata(count);
    this.scaleToSaturation = d3.scaleLinear().
        domain([d3.min(this.dataset), d3.max(this.dataset)]).
        range([0, 100]);
    this.scaleToHeight = d3.scaleLinear().
        domain([d3.min(this.dataset), d3.max(this.dataset)]).
        range([minH, height - 3]);
}

var svg = d3.select('#data-chart').
    append('svg').
    attr('width', count * (w+1)).
    attr('height', height).
    style('border-bottom', 'solid red 1px').
    style('border-top', 'dotted lightblue 1px');

function updateRect(svgRects, datasetProxy) {
        svgRects.attr('x', (d, i) => {
            return i * (w + 1) + 1;
        }).
        attr('y', (d) => {
            return height - datasetProxy.scaleToHeight(d);
        }).
        attr('width', w).
        attr('height', d=>{ return datasetProxy.scaleToHeight(d);}).
        attr('fill', d=> {
            val = datasetProxy.scaleToSaturation(d);
            return `hsl(180, ${Math.floor(val)}%, 60%)`;
        });
}

function updateText(svgTexes, datasetProxy) {
        svgTexes.attr('x', (d, i) => {
            return i * (w + 1) + 1;
        }).
        attr('y', (d) => {
            return height - datasetProxy.scaleToHeight(d) + 12;
        }).
        text(d=> {return d;}).
        attr('font-size', '15px').
        attr('fill', 'blue');
}

var datasetProxy = new DataSetProxy();

var svgRects = svg.selectAll('rect').
    data(datasetProxy.dataset).
    enter().
    append('rect');

var svgTexes = svg.selectAll('text').
        data(datasetProxy.dataset).
        enter().
        append('text');

updateRect(svgRects, datasetProxy);
updateText(svgTexes, datasetProxy);

var btn = document.querySelector('button');
btn.onclick = function() {
    var datasetProxy = new DataSetProxy();

    var svgRects = svg.selectAll('rect').
        data(datasetProxy.dataset);

    var svgTexes = svg.selectAll('text').
            data(datasetProxy.dataset);
    updateRect(svgRects, datasetProxy);
    updateText(svgTexes, datasetProxy);
}
