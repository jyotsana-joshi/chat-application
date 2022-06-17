import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'greed-table',
  templateUrl: './greed-table.component.html',
  styleUrls: ['./greed-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GreedTableComponent implements OnInit {


  @Input() title: any = null;
  @Input() rowData: Array<object> = [];
  @Input() headingData: Array<object> = [];
  @Input() pageId = null;
  @Input() fixedColumn = false;
  @Input() backBtn = true;
  @Input() pagination = true;
  @Output() event = new EventEmitter();

  public selectedRowData: any = {};

  // Export Data
  public submitted = false;
  public errorMessage = null;
  public checkedRows = [];
  public allRowData: any = [];
  public searchText: any;

  // ag-grid
  public defaultColDef = environment.AG_GRID;
  public filter: any;
  private gridApi: any;
  private gridColumnApi: any;

  public columnDefs: any = [];
  public autoGroupColumnDef;
  public rowSelection = 'multiple';
  public pivotPanelShow = 'always';
  public paginationPageSize = 10;
  public rowGroupPanelShow = 'always';

  constructor(
    private fb: FormBuilder,

  ) {
    this.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 170,
      field: 'customerid',
      valueGetter: function (params: any) {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: false,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: false },
    };
  }

  ngOnInit() {
    this.processData();
    this.allRowData = this.rowData;

  }

  public onRowClicked(event: any) {
    this.selectedRowData = event.data;
  }

  public onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.autoSizeAll(false);
    params.api.sizeColumnsToFit();

  }

  // getSearchText() {
  //   this.rowData = this.filter.transform(this.allRowData, this.searchText);
  // }

  public onSortStateChange(event:any) {
    const sortState = this.gridApi.getSortModel();
    if (sortState.length > 0) {
      this.event.emit({ event: 'sort', ...sortState[0] });
    }
  }

  /* Private */
  private processData() {
    if (this.fixedColumn) {
      this.columnDefs = this.headingData;

    } else {
      const data = this.rowData;
      if (data && data.length > 0) {
        const headings = _.keys(data[0]);

        for (const field of headings) {
          const extisField:any = _.find(this.headingData, { field });
          const obj: any = { field };
          if (extisField) {
            obj.headerName = extisField.headerName;
          }
       
          this.columnDefs.push(obj);
        }
      }
    }
  }

  // Default XDR Auto Size All Column
  private autoSizeAll(skipHeader: any) {
    const allColumnIds: any = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: any) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

}


