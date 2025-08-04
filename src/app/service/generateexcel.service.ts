import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class GenerateexcelService {

constructor() { }

downloadExcel(): void {
    // Extract header content
    const headerElement = document.querySelector('.report-generated-bg') as HTMLElement;
    if (!headerElement) {
      console.error('Header element not found');
      return;
    }

    const divisionElement = headerElement.querySelector('b');
    const divisionName = divisionElement ? divisionElement.textContent : '';

    const districtElement = headerElement.querySelector('b + b');
    const districtName = districtElement ? districtElement.textContent : '';

    const dateElement = headerElement.querySelector('span:nth-of-type(2)');
    const dateText = dateElement ? dateElement.textContent : '';

    const generatedAtTextElement = headerElement.querySelector('.text-end span');
     const generatedAtText: string | null = generatedAtTextElement ? generatedAtTextElement.textContent : '';


    const rainfallUnitElement = headerElement.querySelector('.text-end span + br + span');
    const rainfallUnitText: string | null = rainfallUnitElement ? rainfallUnitElement.textContent : null;

    const headingLines = [
      ['Rainfall Recording & Analysis'], // Bold header in Excel
      [`${districtName ? 'Circles wise rainfall for district ' + districtName + ' of ' : ''}division ${divisionName} (as on ${dateText})`],
      [`Generated at: ${generatedAtText}`],
      [rainfallUnitText]
    ];

    // Extract table data
    const tableElement = document.querySelector('.table') as HTMLTableElement;
    if (!tableElement) {
      console.error('Table element not found');
      return;
    }

    const columnsCount = tableElement.rows[0].cells.length;
    const tableData = [];
    const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell?.textContent || '');

    for (let i = 1; i < tableElement.rows.length; i++) {
      const rowData = [];
      for (let j = 0; j < columnsCount; j++) {
        const cell = tableElement.rows[i]?.cells[j];
        rowData.push(cell?.textContent || '');
      }
      tableData.push(rowData);
    }

    // Create worksheet
    const ws_data = [
      ...headingLines,
      [],
      tableHeaders,
      ...tableData
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Save to file
    XLSX.writeFile(wb, 'report.xlsx');
}

downloadExcelIntensity() {
    // Extract table data
    const tableElement = document.querySelector('.table') as HTMLTableElement;
    if (!tableElement) {
        console.error('Table element not found');
        return;
    }

    const columnsCount = tableElement.rows[0].cells.length;
    const tableData = [];
    const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell?.textContent || '');

    for (let i = 1; i < tableElement.rows.length; i++) {
        const rowData = [];
        for (let j = 0; j < columnsCount; j++) {
            const cell = tableElement.rows[i]?.cells[j];
            rowData.push(cell?.textContent || '');
        }
        tableData.push(rowData);
    }

    // Get current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
  });
    const generatedAt=`Generated At: ${formattedDate} ${formattedTime} (Rainfall in mm)`;
    const headingElement = document.querySelector('.report-generated-bg span');
    const headingText = headingElement ? headingElement.textContent : '';

    // Create header content
    const headerContent = [
        [headingText],
        [generatedAt],
        ['']
    ];

    // Create worksheet
    const ws_data = [
        ...headerContent,
        tableHeaders,
        ...tableData
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Style the headers
    const headerRange = XLSX.utils.decode_range('A3:' + XLSX.utils.encode_col(columnsCount) + '3');
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
            font: {
                bold: true
            }
        };
    }

    // Style the dynamic headers
    const dynamicHeaderRange = XLSX.utils.decode_range('A1:A2');
    for (let R = dynamicHeaderRange.s.r; R <= dynamicHeaderRange.e.r; ++R) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
            font: {
                bold: true,
                sz: 14
            }
        };
    }

    // Merge cells for the header
    ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: columnsCount - 1 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: columnsCount - 1 } }
    ];

    // Apply border styles if !ref is defined
    if (ws['!ref']) {
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cellAddress]) continue;
                ws[cellAddress].s = {
                    border: {
                        top: { style: "thin", color: { auto: 1 } },
                        right: { style: "thin", color: { auto: 1 } },
                        bottom: { style: "thin", color: { auto: 1 } },
                        left: { style: "thin", color: { auto: 1 } }
                    }
                };
            }
        }
    }

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Save to file
    XLSX.writeFile(wb, 'report.xlsx');
}

downloadDivisionDailyRain(): void {
  // Extract header content
  const headerElement = document.querySelector('.report-generated-bg') as HTMLElement;
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }

  const dateElement = headerElement.querySelector('span:nth-of-type(2)');
  const dateText = dateElement ? dateElement.textContent : '';

  const generatedAtTextElement = headerElement.querySelector('.text-end span');
  const generatedAtText: string | null = generatedAtTextElement ? generatedAtTextElement.textContent : '';

  const rainfallUnitElement = headerElement.querySelector('.text-end span + br + span');
  //const rainfallUnitText: string | null = rainfallUnitElement ? rainfallUnitText.textContent : null;

  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const headingLines = [
    ['Rainfall Recording & Analysis'], // Bold header in Excel
    [`Division wise rainfall for Maharashtra State (as on ${formattedDate})`],
    [`Generated At: ${formattedDate} `]
  ];

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }

  const columnsCount = tableElement.rows[0].cells.length;
  const tableData = [];
  const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell?.textContent || '');

  for (let i = 1; i < tableElement.rows.length; i++) {
    const rowData = [];
    for (let j = 0; j < columnsCount; j++) {
      const cell = tableElement.rows[i]?.cells[j];
      rowData.push(cell?.textContent || '');
    }
    tableData.push(rowData);
  }

  // Append the additional line at the end of the table data
  const additionalLine = ['* The data is subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.'];
  while (additionalLine.length < columnsCount) {
    additionalLine.push('');
  }
  tableData.push(additionalLine);

  // Create worksheet
  const ws_data = [
    ...headingLines,
    [],
    tableHeaders,
    ...tableData
  ];
  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Define border style (using empty object as a workaround)
  const borderStyle = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  };

  // Apply styles to headers and borders to the table
  const headerRange = XLSX.utils.decode_range(ws['!ref'] as string);
  for (let R = headerRange.s.r; R <= headerRange.e.r; ++R) {
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ c: C, r: R });
      if (!ws[address]) continue;
      ws[address].s = ws[address].s || {};
      if (R === 2) {
        // 3rd row for headers (0-based index)
        ws[address].s.font = { bold: true };
      }
      ws[address].s.border = borderStyle;
    }
  }

  // Create workbook and add worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');

  // Save to file
  XLSX.writeFile(wb, 'report.xlsx');
}

// downloadcurrentyearExcel() {
//   const headerElement = document.querySelector('.report-generated-bg');
//   if (!headerElement) {
//       console.error('Header element not found');
//       return;
//   }

//   const headerTextLines:any[] = [];
//   const rowElements = headerElement.querySelectorAll('.row');
//   rowElements.forEach(row => {
//       const colLeft = row.querySelector('.col-sm-6');
//       const colRight = row.querySelector('.text-end');

//       if (colLeft) {
//           const title = colLeft.querySelector('h5')?.textContent;
//           const subtitle = colLeft.querySelector('span')?.textContent;

//           if (title) headerTextLines.push(title);
//           if (subtitle) headerTextLines.push(subtitle);
//       }

//       if (colRight) {
//           const generatedAt = colRight.querySelector('span')?.textContent;
//           const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;

//           if (generatedAt) headerTextLines.push(generatedAt);
//           if (rainfallText) headerTextLines.push(rainfallText);
//       }
//   });

//   const tableElement = document.querySelector('.table');
//   if (!tableElement) {
//       console.error('Table element not found');
//       return;
//   }

//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.table_to_sheet(tableElement, { raw: true });

//   const headerRowsCount = headerTextLines.length + 1;
//   const range = XLSX.utils.decode_range(worksheet['!ref'] as string);

//   for (let R = range.e.r; R >= 0; --R) {
//     for (let C = range.s.c; C <= range.e.c; ++C) {
//       const cellAddress = { r: R, c: C };
//       const newCellAddress = { r: R + headerRowsCount, c: C };
//       const cellRef = XLSX.utils.encode_cell(cellAddress);
//       const newCellRef = XLSX.utils.encode_cell(newCellAddress);

//       if (worksheet[cellRef]) {
//         worksheet[newCellRef] = worksheet[cellRef];
//         delete worksheet[cellRef];
//       }
//     }
//   }

//   headerTextLines.forEach((line, index) => {
//     const cellRef = XLSX.utils.encode_cell({ r: index, c: 0 });
//     worksheet[cellRef] = { t: 's', v: line, s: { font: { bold: true }, alignment: { horizontal: 'left' } } };
//   });

//   const newRange = XLSX.utils.encode_range({
//     s: { r: 0, c: 0 },
//     e: { r: range.e.r + headerRowsCount, c: range.e.c }
//   });
//   worksheet['!ref'] = newRange;

//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
//   XLSX.writeFile(workbook, 'report.xlsx');
// }


downloadcurrentyearExcel() {
  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }

  const headerTextLines: string[] = [];
  let subtitleWithHtml = '';
  let subtitlePlain = '';
  let generatedAtText = '';
  const rowElements = headerElement.querySelectorAll('.row');

  rowElements.forEach(row => {
    const colLeft = row.querySelector('.col-sm-6');
    const colRight = row.querySelector('.text-end');

    if (colLeft) {
      const title = colLeft.querySelector('h5')?.textContent?.trim();
      subtitleWithHtml = colLeft.querySelector('span')?.innerHTML?.trim() || '';
      subtitlePlain = subtitleWithHtml.replace(/<b[^>]*>(.*?)<\/b>/g, '$1').trim();
      if (title) headerTextLines.push(title);
    }

    if (colRight) {
      generatedAtText = colRight.querySelector('span')?.textContent?.trim() || '';
      if (generatedAtText) {
        generatedAtText = generatedAtText.replace(/\{\{.*\}\}/, '').trim();
        headerTextLines.push(generatedAtText);
      }
    }
  });

  const tableElement = document.querySelector('.table');
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(tableElement, { raw: true });

  const mainHeaders: string[] = [];
  const subHeaders: string[] = [];
  const theadRows = tableElement.querySelectorAll('thead tr');

  if (theadRows.length >= 2) {

    const mainHeaderCells = theadRows[0].querySelectorAll('th');
    mainHeaderCells.forEach(th => {
      mainHeaders.push(th.textContent?.trim() || '');
    });


    const subHeaderCells = theadRows[1].querySelectorAll('th');
    subHeaderCells.forEach(th => {
      subHeaders.push(th.textContent?.trim() || '');
    });
  }


  const rowHeaders = [
    mainHeaders,
    subHeaders
  ];


  const range = XLSX.utils.decode_range(worksheet['!ref'] as string);
  const headerRowsCount = 3;

  for (let R = range.e.r; R >= 0; --R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { r: R, c: C };
      const newCellAddress = { r: R + headerRowsCount, c: C };
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const newCellRef = XLSX.utils.encode_cell(newCellAddress);

      if (worksheet[cellRef]) {
        worksheet[newCellRef] = worksheet[cellRef];
        delete worksheet[cellRef];
      }
    }
  }


  const titleCellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
  worksheet[titleCellRef] = {
    t: 's',
    v: headerTextLines[0],
    s: {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center', vertical: 'center' }
    }
  };

  worksheet['!merges'] = worksheet['!merges'] || [];
  worksheet['!merges'].push({
    s: { r: 0, c: 0 },
    e: { r: 0, c: mainHeaders.length - 1 }
  });


  const subtitleCellRef = XLSX.utils.encode_cell({ r: 1, c: 0 });
  worksheet[subtitleCellRef] = {
    t: 's',
    v: subtitlePlain,
    s: {
      font: { bold: true, sz: 12 },
      alignment: { horizontal: 'center', vertical: 'center' }
    }
  };

  worksheet['!merges'].push({
    s: { r: 1, c: 0 },
    e: { r: 1, c: mainHeaders.length - 1 }
  });


  const generatedAtCellRef = XLSX.utils.encode_cell({ r: 2, c: 0 });
  worksheet[generatedAtCellRef] = {
    t: 's',
    v: generatedAtText,
    s: {
      font: { bold: true, sz: 12 },
      alignment: { horizontal: 'center', vertical: 'center' }
    }
  };

  worksheet['!merges'].push({
    s: { r: 2, c: 0 },
    e: { r: 2, c: mainHeaders.length - 1 }
  });


  rowHeaders.forEach((row, rowIndex) => {
    row.forEach((header, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: headerRowsCount + rowIndex, c: colIndex });
      worksheet[cellRef] = {
        t: 's',
        v: header,
        s: {
          font: { bold: rowIndex === 0 },
          alignment: { horizontal: 'center', vertical: 'center' }
        }
      };
    });
  });


  worksheet['!merges'] = worksheet['!merges'] || [];


  worksheet['!merges'].push({
    s: { r: headerRowsCount, c: 2 },
    e: { r: headerRowsCount, c: 8 }
  });


  worksheet['!merges'].push({
    s: { r: headerRowsCount, c: 0 },
    e: { r: headerRowsCount + 1, c: 0 }
  });

  worksheet['!merges'].push({
    s: { r: headerRowsCount, c: 1 },
    e: { r: headerRowsCount + 1, c: 1 }
  });

  const tableRows = Array.from(tableElement.querySelectorAll('tbody tr'));
  tableRows.forEach((row, rowIndex) => {
    const cells = Array.from(row.querySelectorAll('td'));
    cells.forEach((cell, cellIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIndex + headerRowsCount + 2, c: cellIndex });
      worksheet[cellRef] = {
        t: 's',
        v: cell.textContent?.trim() || '',
        s: { alignment: { horizontal: 'center' } }
      };
    });
  });


  const newRange = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: range.e.r + headerRowsCount + 3, c: range.e.c }
  });

  worksheet['!ref'] = newRange;
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

  const fileName = subtitlePlain ? subtitlePlain.replace(/[^a-zA-Z0-9]/g, '_') : 'report';
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}






//heavy rain
downloadheavyrain() {

const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
      console.error('Header element not found');
      return;
  }

  const headerTextLines:any[] = [];
  const rowElements = headerElement.querySelectorAll('.row');
  rowElements.forEach(row => {
      const colLeft = row.querySelector('.col-sm-6');
      const colRight = row.querySelector('.text-end');

      if (colLeft) {
          const title = colLeft.querySelector('h5')?.textContent;
          const subtitle = colLeft.querySelector('span')?.textContent;

          if (title) headerTextLines.push(title);
          if (subtitle) headerTextLines.push(subtitle);
      }

      if (colRight) {
          const generatedAt = colRight.querySelector('span')?.textContent;
          const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;

          if (generatedAt) headerTextLines.push(generatedAt);
          if (rainfallText) headerTextLines.push(rainfallText);
      }
  });

  const tableElement = document.querySelector('.table');
  if (!tableElement) {
      console.error('Table element not found');
      return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(tableElement, { raw: true });
  const headerRowsCount = headerTextLines.length + 1;
  const range = XLSX.utils.decode_range(worksheet['!ref'] as string);

  for (let R = range.e.r; R >= 0; --R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { r: R, c: C };
      const newCellAddress = { r: R + headerRowsCount, c: C };
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const newCellRef = XLSX.utils.encode_cell(newCellAddress);

      if (worksheet[cellRef]) {
        worksheet[newCellRef] = worksheet[cellRef];
        delete worksheet[cellRef];
      }
    }
  }

  headerTextLines.forEach((line, index) => {
    const cellRef = XLSX.utils.encode_cell({ r: index, c: 0 });
    worksheet[cellRef] = { t: 's', v: line, s: { font: { bold: true }, alignment: { horizontal: 'left' } } };
  });

  const newRange = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: range.e.r + headerRowsCount, c: range.e.c }
  });
  worksheet['!ref'] = newRange;

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  XLSX.writeFile(workbook, 'report.xlsx');
}


}
