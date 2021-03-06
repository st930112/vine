let FlowerEntity = require('./FlowerEntity.js'),
	math = require('mathjs');

var FlowerBuilder = {
	buildWithArray : buildWithArray,
	startEntity :startEntity,
	target : undefined
};
module.exports = FlowerBuilder;

function buildWithArray(jsonArray) {
	if (!FlowerBuilder.target) {
		console.error('FlowerBuilder no target');
	}

	let flowers = [];

	for (var i = 0; i < jsonArray.length; i++) {
		let flower = makeFlower( jsonArray[i] );
		flowers.push(flower);
	}

	flowers.sort((a, b)=>{
		return (a.position.x < b.position.x) ? 1 : -1;
	});

	return flowers;
}

function makeFlower(obj) {
	if (obj.hasOwnProperty('position') 
		&& obj['position'].hasOwnProperty('x')
		&& obj['position'].hasOwnProperty('y')
		&& obj['position'].hasOwnProperty('rotation')
		&& obj.hasOwnProperty('size'))
	{
		return new FlowerEntity(obj.position, obj.size);
	}
}
function startEntity(){
	let startPointPosition ={
		x: math.number(FlowerBuilder.target.attr().width),
		y: math.number(FlowerBuilder.target.attr().height*0.8),
		rotation: -90
	};

	return new FlowerEntity(startPointPosition, 0);
}