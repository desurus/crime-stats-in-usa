var CRIMESTATS = CRIMESTATS || {};

(function(o){
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
		    	//console.log(z + " = " + JSON.stringify(worksheet[z].v));
		    	if (worksheet[z].v.indexOf("Alabama") > -1) {
		    		data["AL"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Alaska") > -1) {
		    		data["AK"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Arizona") > -1) {
		    		data["AZ"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Arkansas") > -1) {
		    		data["AR"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("California") > -1) {
		    		data["CA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Colorado") > -1) {
		    		data["CO"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Connecticut") > -1) {
		    		data["CT"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Delaware") > -1) {
		    		data["DE"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Florida") > -1) {
		    		data["FL"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Georgia") > -1) {
		    		data["GA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Hawaii") > -1) {
		    		data["HI"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Idaho") > -1) {
		    		data["ID"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Illinois") > -1) {
		    		data["IL"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Indiana") > -1) {
		    		data["IN"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Iowa") > -1) {
		    		data["IA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Kansas") > -1) {
		    		data["KS"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Kentucky") > -1) {
		    		data["KY"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Louisiana") > -1) {
		    		data["LA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Maine") > -1) {
		    		data["ME"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Maryland") > -1) {
		    		data["MD"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Massachusetts") > -1) {
		    		data["MA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Michigan") > -1) {
		    		data["MI"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Minnesota") > -1) {
		    		data["MN"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Mississippi") > -1) {
		    		data["MS"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Missouri") > -1) {
		    		data["MO"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Montana") > -1) {
		    		data["MT"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Nebraska") > -1) {
		    		data["NE"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Nevada") > -1) {
		    		data["NV"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("New Hampshire") > -1) {
		    		data["NH"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("New Jersey") > -1) {
		    		data["NJ"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("New Mexico") > -1) {
		    		data["NM"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("New York") > -1) {
		    		data["NY"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("North Carolina") > -1) {
		    		data["NC"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("North Dakota") > -1) {
		    		data["ND"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Ohio") > -1) {
		    		data["OH"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Oklahoma") > -1) {
		    		data["OK"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Oregon") > -1) {
		    		data["OR"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Pennsylvania") > -1) {
		    		data["PA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Rhode Island") > -1) {
		    		data["RI"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("South Carolina") > -1) {
		    		data["SC"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("South Dakota") > -1) {
		    		data["SD"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Tennessee") > -1) {
		    		data["TN"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Texas") > -1) {
		    		data["TX"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Utah") > -1) {
		    		data["UT"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Vermont") > -1) {
		    		data["VT"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Virginia") > -1) {
		    		data["VA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Washington") > -1) {
		    		data["WA"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("West Virginia") > -1) {
		    		data["WV"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Wisconsin") > -1) {
		    		data["WI"] = getRatesByState(worksheet, z);
		    	}
		    	if (worksheet[z].v.indexOf("Wyoming") > -1) {
		    		data["WY"] = getRatesByState(worksheet, z);
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
