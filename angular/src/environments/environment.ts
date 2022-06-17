// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
AG_GRID: {
  defaultColDef: {
    editable: false, // make every column editable
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    suppressSizeToFit: true,
    // width: 'auto', // set every column width
    // filter: 'agTextColumnFilter', // make every column use 'text' filter by default
    cellStyle: { textAlign: 'center' },
    flex: 1,
    minWidth: 100,
    sortingOrder: ['asc', 'desc']
  }
},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
