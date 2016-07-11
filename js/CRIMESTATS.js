var CRIMESTATS = CRIMESTATS || {};

(function(o){
	var states_hash = {
	    "AL": "Alabama",
	    "AK": "Alaska",
	    "AS": "American Samoa",
	    "AZ": "Arizona",
	    "AR": "Arkansas",
	    "CA": "California",
	    "CO": "Colorado",
	    "CT": "Connecticut",
	    "DE": "Delaware",
	    "DC": "District Of Columbia",
	    "FM": "Federated States Of Micronesia",
	    "FL": "Florida",
	    "GA": "Georgia",
	    "GU": "Guam",
	    "HI": "Hawaii",
	    "ID": "Idaho",
	    "IL": "Illinois",
	    "IN": "Indiana",
	    "IA": "Iowa",
	    "KS": "Kansas",
	    "KY": "Kentucky",
	    "LA": "Louisiana",
	    "ME": "Maine",
	    "MH": "Marshall Islands",
	    "MD": "Maryland",
	    "MA": "Massachusetts",
	    "MI": "Michigan",
	    "MN": "Minnesota",
	    "MS": "Mississippi",
	    "MO": "Missouri",
	    "MT": "Montana",
	    "NE": "Nebraska",
	    "NV": "Nevada",
	    "NH": "New Hampshire",
	    "NJ": "New Jersey",
	    "NM": "New Mexico",
	    "NY": "New York",
	    "NC": "North Carolina",
	    "ND": "North Dakota",
	    "MP": "Northern Mariana Islands",
	    "OH": "Ohio",
	    "OK": "Oklahoma",
	    "OR": "Oregon",
	    "PW": "Palau",
	    "PA": "Pennsylvania",
	    "PR": "Puerto Rico",
	    "RI": "Rhode Island",
	    "SC": "South Carolina",
	    "SD": "South Dakota",
	    "TN": "Tennessee",
	    "TX": "Texas",
	    "UT": "Utah",
	    "VT": "Vermont",
	    "VI": "Virgin Islands",
	    "VA": "Virginia",
	    "WA": "Washington",
	    "WV": "West Virginia",
	    "WI": "Wisconsin",
	    "WY": "Wyoming",
	}

	o.init = function(){
		// parse xls into json
		document.getElementById("input").addEventListener('change', o.parse_xls, false);
	};

	o.data_violent_crimes = function(workbook) {
		sheet_name_list = workbook.SheetNames;
		data = {};
		sheet_name_list.forEach(function(y) {
		  	var worksheet = workbook.Sheets[y];
		  	for (z in worksheet) {
		    	// all keys that start with "!" and do not start with "A" we skip
		    	if(z[0] === '!' || z[0] != 'A') continue;
		    	for (s in states_hash) {
		    		if (worksheet[z].v.indexOf(states_hash[s]) > -1) {
			    		data[s] = getRatesByState(worksheet, z);
			    	}
		    	}
		  	}
		  	// console.log(data);
		});

		// lets build our dynamic palette based on the rate of crimes for the 2014
		onlyValues = []
		for (var r in data) {
			onlyValues.push(data[r]['rate_2014']);
		}
	    minValue = Math.min.apply(null, onlyValues);
        maxValue = Math.max.apply(null, onlyValues);

        // create color palette function
		// color can be whatever you wish
		paletteScale = d3.scale.linear().domain([minValue,maxValue]).range(["#EFEFFF","#02386F"]); // blue color

		for (var r in data) {
			data[r]['fillColor'] = paletteScale(data[r]['rate_2014']);
		}

		// lets draw the map
		o.draw_map(data);

		function getRatesByState(worksheet, z) {
			old_rate_row_number = parseInt(z.substring(1));
			new_rate_row_number = old_rate_row_number + 1;
			rate_change_row_number = new_rate_row_number + 1;
			return {
				'rate_2013': worksheet['E' + old_rate_row_number].v,
				'rate_2014': worksheet['E' + new_rate_row_number].v,
				'rate_change': worksheet['E' + rate_change_row_number].v,
			}
		};
	};

	o.draw_map = function(crime_data) {
		map = new Datamap({
		  	element: document.getElementById('map_of_usa'),
		  	scope: "usa",
		  	data: crime_data,
		  	geographyConfig: {
		  		borderColor: '#DEDEDE',
		    	highlightBorderColor: '#FFFFFF',
		    	highlightBorderWidth: 2,
		   		popupTemplate: function(geography, data) {
		      		return '<div class="hoverinfo">' + 
		      		geography.properties.name + 
		      		'<br/>Rate 2013: ' +  
		      		data.rate_2013 + 
		      		'<br/>Rate 2014: ' + 
		      		data.rate_2014 + 
		      		'<br/>Change: ' + 
		      		data.rate_change + 
		      		'%</div>'
		      	},
		    },
		    fills: {
				defaultFill: '#F5F5F5',
			},
		  	done: function(datamap) {
            	datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                	alert(geography.properties.name);
            	});
        	}
		});
		map.labels();
	};

	o.parse_xls = function(e) {
		var files = e.target.files;
		var i,f;
		for (i = 0, f = files[i]; i != files.length; ++i) {
		    var reader = new FileReader();
		    var name = f.name;
		    reader.onload = function(e) {
		      	var data = e.target.result;
		      	var workbook = XLSX.read(data, {type: 'binary'});
		      	// lets call a function that will format our data object
		      	o.data_violent_crimes(workbook);
		    };
		    reader.readAsBinaryString(f);
		}
	};
})(CRIMESTATS);

CRIMESTATS.init();
