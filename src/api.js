
/**
 * ROI calculate API methods.
 */

/**
 * API URL and headers.
 */
const API_URL = "/api/crunchbase/api/v4";
const API_HEADERS = { "Content-Type": "application/json" };

/**
 * Get territories from Crunchbase API.
 * API Response: array of objects
 * {
 *   "facet_ids": [
 *       "city"
 *   ],
 *   "identifier": {
 *       "entity_def_id": "location",
 *       "permalink": "united-louisiana",
 *       "uuid": "920ec2d4-ca70-77d7-8baa-fd5744ac427b",
 *       "value": "United",
 *       "location_type": "city"
 *   },
 *   "short_description": "United, Louisiana, United States, North America"
 * },
 * Use "short_description" to display the territory name and "uuid" as value.
 *
 * @param {*} query
 *
 * @returns array of objects with 'name' and 'value' properties
 */
export const getTerritories = async ( query ) => {
	const response = await fetch( API_URL + "/autocompletes?query=" + query + "&collection_ids=locations&limit=25", { headers: API_HEADERS } );
	const data = await response.json();

	if ( data.ok && 200 !== data.status || !data?.entities ) {
		return [];
	}

	const entities = data?.entities ?? [];

	return entities.map( ( entity ) => {
		return {
			'name': entity?.short_description,
			'value': entity?.identifier?.uuid,
		};
	} );
};

/**
 * Get industries from Crunchbase API.
 * API Response: array of objects
 * {
 *  "identifier": {
 *      "entity_def_id": "category_group",
 *      "permalink": "administrative-services",
 *      "uuid": "a02d6141-a2f8-a33e-7131-4b13f355b206",
 *      "value": "Administrative Services"
 *  }
 * }
 * Use "value" to display the industry name and "uuid" as value.
 *
 * @param {*} query
 *
 * @returns array of objects with 'name' and 'value' properties
 */
export const getIndustries = async ( query ) => {
	const response = await fetch( API_URL + "/autocompletes?query=" + query + "&collection_ids=category_groups&limit=25", { headers: API_HEADERS } );
	const data = await response.json();

	if ( data.ok && 200 !== data.status || !data?.entities ) {
		return [];
	}

	const entities = data?.entities ?? [];

	return entities.map( ( entity ) => {
		return {
			'name': entity?.identifier?.value,
			'value': entity?.identifier?.uuid,
		};
	} );
};

const formatEmployeeNum = ( num ) => {
	if ( num == '+' ) {
		return 'max';
	}
	return String( num ).padStart( 5, '0' );
};

const getEmployeeCondition = ( min, max ) => {

	const employeesRange = [
		[1,10],
		[11,50],
		[51,100],
		[101,250],
		[251,500],
		[501,1000],
		[1001,5000],
		[5001,10000],
		[10001, '+'],
	];

	max = ( max == '10001+' ? '+' : max );

	// If min and max are the same as the first and last range, return empty string - Since we need all data
	if ( min == employeesRange[0][0] && max == employeesRange[employeesRange.length - 1][1] ) {
		return null;
	}

	const selectedEmployees = [];
	let rangeStarted = false;

	employeesRange.forEach( ( range ) => {
		if ( range[0] == min ) {
			rangeStarted = true;
		}
		if ( rangeStarted ) {
			selectedEmployees.push( range );
		}
		if ( range[1] == max ) {
			rangeStarted = false;
		}
	} );

	if ( selectedEmployees.length == 0 ) {
		return null;
	}

	const result = [];

	selectedEmployees.forEach( ( employee ) => {
		result.push( 'c_' + formatEmployeeNum( employee[0] ) + '_' + formatEmployeeNum( employee[1] ) );
	} );

	return {
		"type": "predicate",
		"field_id": "num_employees_enum",
		"operator_id": "includes",
		"include_nulls": false,
		"values": [
			...result
		]
	};
};

const getOrganizationsData = async ( filters, limit = 100 ) => {
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth( sixMonthsAgo.getMonth() - 6 );
	const sixMonthsAgoDate = sixMonthsAgo.toISOString().split( 'T' )[ 0 ]; // Y-m-d format

	const queryConditions = [
		{
			"type": "predicate",
			"field_id": "facet_ids",
			"operator_id": "includes",
			"values": [
				"company"
			]
		},
		{
			"type": "predicate",
			"field_id": "operating_status",
			"operator_id": "eq",
			"values": [
				"active"
			]
		}
	];

	if ( filters.categories ) {
		queryConditions.push({
			"type": "predicate",
			"field_id": "category_groups",
			"operator_id": "includes",
			"values": [
				filters.categories.join( '","' )
			]
		});
	}

	if ( filters.locations ) {
		queryConditions.push({
			"type": "predicate",
			"field_id": "location_identifiers",
			"operator_id": "includes",
			"values": [
				filters.locations.join( '","' )
			]
		});
	}

	if ( filters.last_funding_at ) {
		queryConditions.push({
			"type": "predicate",
			"field_id": "last_funding_at",
			"operator_id": "gte",
			"include_nulls": false,
			"values": [
				sixMonthsAgoDate
			]
		});
	}

	if ( filters.last_key_employee_change_date ) {
		queryConditions.push({
			"type": "predicate",
			"field_id": "last_key_employee_change_date",
			"operator_id": "gte",
			"values": [
				sixMonthsAgoDate
			]
		});
	}

	if ( filters.employee_min ) {
		const empQuery = getEmployeeCondition( filters.employee_min, filters.employee_max );
		if ( empQuery ) {
			queryConditions.push( empQuery );
		}
	}

	const body = {
		"field_ids": [
			"uuid"
		],
		"query": queryConditions,
		"limit": limit
	};

	const response = await fetch( API_URL + "/searches/organizations" , { method: "POST", headers: API_HEADERS, body: JSON.stringify( body ) } );
	const data = await response.json();

	if ( data.ok && 200 !== data.status || !data?.entities ) {
		return [];
	}

	return data;
};

export const getROICalculatorData = async ( winRate, dealSize, companySizeRange, territories, industries ) => {
	const employeeMin = companySizeRange[ 0 ] || 0;
	const employeeMax = companySizeRange[ 1 ] || 0;

	const fundsData = {
		'last_funding_at': true,
		'employee_min': employeeMin,
		'employee_max': employeeMax,
		'categories': industries,
		'locations': territories,
	};

	const organizationsData = await getOrganizationsData( fundsData, 1 );

	const fundsCount = organizationsData.count ?? 0;

	delete fundsData.last_funding_at;
	fundsData.last_key_employee_change_date = true;

	const hiresData = await getOrganizationsData( fundsData, 1 );

	const hiresCount = hiresData.count ?? 0;

	const organizationsCount = fundsCount + hiresCount;

	const revenue = parseInt((organizationsCount * parseInt(winRate) / 100) * parseInt(dealSize));

	return {
		'funds': fundsCount, // #roi-recent-funds
		'hires': hiresCount, // #roi-leadership-hire
		'organizations': fundsCount + hiresCount, // #roi-total-accounts
		'revenue': '$' + revenue, // #roi-additional-revenue
	};
}
