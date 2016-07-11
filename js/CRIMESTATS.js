var CRIMESTATS = CRIMESTATS || {};

(function(o){
	o.init = function(){
		// parse xls into json
		document.getElementById("input").addEventListener('change', o.parse_xls, false);
	};

	o.data_violent_crimes = function(workbook){
		var sheet_name_list = workbook.SheetNames;
		var data_new = {}
		sheet_name_list.forEach(function(y) {
		  	var worksheet = workbook.Sheets[y];
		  	for (z in worksheet) {
		    	// all keys that start with "!" and do not start with "A" we skip
		    	if(z[0] === '!' || z[0] != 'A') continue;
		    	console.log(z + " = " + JSON.stringify(worksheet[z].v));
		  	}
		});

		var data = {
			"CA" : {
				"fillKey": "Republican",
				"rate": 345,
			},
			"FL" : {
				"fillKey": "Light Republican",
				"rate": 556,
			},
		}
		o.draw_map(data);
	};

	o.draw_map = function(crime_data){
		var map = new Datamap({
		  	element: document.getElementById('map_of_usa'),
		  	scope: "usa",
		  	data: crime_data,
		  	geographyConfig: {
		    	highlightBorderColor: '#bada55',
		    	highlightBorderWidth: 2,
		   		popupTemplate: function(geography, data) {
		      		return '<div class="hoverinfo">' + geography.properties.name + '<br/>Rate:' +  data.rate + ' '
		      	},
		    },
		    fills: {
				'Republican': '#CC4731',
				'Democrat': '#306596',
				'Heavy Democrat': '#667FAF',
				'Light Democrat': '#A9C0DE',
				'Heavy Republican': '#CA5E5B',
				'Light Republican': '#EAA9A8',
				defaultFill: '#EDDC4E',
			},
		  	done: function(datamap) {
            	datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                	alert(geography.properties.name);
            	});
        	}
		});
		map.labels();
	};

	o.parse_xls = function(e){
		var files = e.target.files;
		var i,f;
		for (i = 0, f = files[i]; i != files.length; ++i) {
		    var reader = new FileReader();
		    var name = f.name;
		    reader.onload = function(e) {
		      	var data = e.target.result;
		      	var workbook = XLSX.read(data, {type: 'binary'});
		      	console.log(workbook);

		      	o.data_violent_crimes(workbook);
		    };
		    reader.readAsBinaryString(f);
		}
	};
})(CRIMESTATS);

CRIMESTATS.init();
