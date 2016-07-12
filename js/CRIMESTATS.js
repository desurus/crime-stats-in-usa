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

	var crime_hash = {
		'E': {'color_hash': ['#EFEFFF', '#02386F'], 'name': 'All violent crimes'},  // total violent crimes (blue)
		'G': {'color_hash': ['#E498F1', '#610472'], 'name': 'Murder'}, 			    // murder crimes (violet)
		'I': {'color_hash': ['#A0CCFE', '#246AB8'], 'name': 'Rape'}, 			    // rape revised definition (light blue)
		'M': {'color_hash': ['#6FEC95', '#087D2C'], 'name': 'Robbery'}, 		    // robbery (green)
		'O': {'color_hash': ['#FFF28F', '#C5B507'], 'name': 'Aggraveted assault'},  // aggraveted assault (yellow)
		'Q': {'color_hash': ['#FFE08F', '#EEB117'], 'name': 'All property crimes'}, // total property crimes (orange)
		'S': {'color_hash': ['#FFAAAA', '#801515'], 'name': 'Burglary'}, 			// burglary (red)
		'U': {'color_hash': ['#DDA2A2', '#5C0A0A'], 'name': 'Leceny-theft'}, 		// leceny-theft (dark red)
		'W': {'color_hash': ['#C4C4C4', '#414440'], 'name': 'Motor vehicle theft'}, // motor vehicle theft (dark grey)
	}

	o.init = function(){
		// parse xls into json
		o.parse_xls('E');
	};

	o.get_crime_data = function(workbook, color_code) {
		sheet_name_list = workbook.SheetNames;
		data = {};
		sheet_name_list.forEach(function(y) {
		  	var worksheet = workbook.Sheets[y];
		  	for (z in worksheet) {
		    	// all keys that start with "!" and do not start with "A" we skip
		    	if(z[0] === '!' || z[0] != 'A') continue;
		    	for (s in states_hash) {
		    		if (worksheet[z].v.indexOf(states_hash[s]) > -1) {
			    		data[s] = getRatesByState(worksheet, z, color_code);
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
		paletteScale = d3.scale.linear().domain([minValue,maxValue]).range(crime_hash[color_code]['color_hash']);

		for (var r in data) {
			data[r]['fillColor'] = paletteScale(data[r]['rate_2014']);
		}

		// lets draw the map
		o.draw_map(data, color_code);

		function getRatesByState(worksheet, z, color_code) {
			old_rate_row_number = parseInt(z.substring(1));
			new_rate_row_number = old_rate_row_number + 1;
			rate_change_row_number = new_rate_row_number + 1;
			return {
				'rate_2013': worksheet[color_code + old_rate_row_number].v,
				'rate_2014': worksheet[color_code + new_rate_row_number].v,
				'rate_change': worksheet[color_code + rate_change_row_number].v,
			}
		};
	};

	o.draw_map = function(crime_data, color_code) {
		// lets empty the div first
		document.getElementById('map_of_usa').innerHTML = '';
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
		      			'<strong>' + geography.properties.name + '</strong>' +
		      			'<br/>Rate 2013: ' +  
		      			'<strong>' + data.rate_2013 + '</strong>' +
		      			'<br/>Rate 2014: ' + 
		      			'<strong>' + data.rate_2014 + '</strong>' +
		      			'<br/>Change: ' + 
		      			'<strong>' + data.rate_change + '</strong>' +
		      			'%</div>'
		      	},
		    },
		    fills: {
				defaultFill: '#F5F5F5',
			},
		  	/* done: function(datamap) {
            	datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                	alert(geography.properties.name);
            	});
        	}*/
		});
		map.labels();
		o.draw_menu(color_code);
	};

	o.draw_menu = function(active_menu) {
		var html = '';
		for (c in crime_hash) {
			if (active_menu == c) {
				html += '<a href="#'+ c +'" \
					class="list-group-item active" \
					onclick="CRIMESTATS.parse_xls(\'' + c + '\'); return false;">' + 
					'<span class="menu-label" style="background-color:' + crime_hash[c]['color_hash'][1] + '"></span>' +
					crime_hash[c]['name'] + 
					'</a>';
			} else {
				html += '<a href="#'+ c +'" \
					class="list-group-item" \
					onclick="CRIMESTATS.parse_xls(\'' + c + '\'); return false;">' +
					'<span class="menu-label" style="background-color:' + crime_hash[c]['color_hash'][1] + '"></span>' +
					crime_hash[c]['name'] + 
					'</a>';
			}
		}
		document.getElementById("menu").innerHTML = html;
	}

	o.parse_xls = function(color_code) {
		/* set up XMLHttpRequest */
		var url = "/data/Table_4_Crime_in_the_United_States_by_Region_Geographic_Division_and_State_2013-2014.xls";
		var oReq = new XMLHttpRequest();
		oReq.open("GET", url, true);
		oReq.responseType = "arraybuffer";

		oReq.onload = function(e) {
		  	var arraybuffer = oReq.response;

			/* convert data to binary string */
			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			/* Call XLSX */
			var workbook = XLSX.read(bstr, {type:"binary"});

			o.get_crime_data(workbook, color_code);
		}

		oReq.send();
	};

})(CRIMESTATS);

CRIMESTATS.init();
