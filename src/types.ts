/**
 * These interfaces are incomplete on purpose;
 * only fields that have been used within the components
 * are added. There is always the option to add the missing fields
 * later on.
 */
export interface Hub {
    uuid: string;
		cardDescription: string;
		displayName: string;
		formattedRecoveredQuantity?: string;
		formattedTotalRecoveredQuantity?: string;
		location?: string;
		logo: Logo;
		name: string;
		slug: string;
		parentHubName?: string;
		referenceQuantityUnit: string;
		type?: CompanyType;
		unassignedQuantityTotal: number;
}

export enum CompanyType {
	'Recycling Company' = 'Recycling Company',
	'Collection Company' = 'Collection Company',
	'Waste Collection' = 'Waste Collection',
	'River Cleanup' = 'River Cleanup',
	'Waste Collection and Recycling' = 'Waste Collection & Recycling',
}

export interface Logo {
	directLink?: string;
	uuid: string;
}