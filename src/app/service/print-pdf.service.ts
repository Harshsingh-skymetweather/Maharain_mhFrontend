import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PrintPDFService {
  currentDate = new Date();
  constructor() { }

downloadPdf() {
    const pdf = new jsPDF('landscape', 'mm', 'a4'); // Landscape mode for more width
    // Heading
    console.log('here');
    const heading = `
      Rainfall Recording & Analysis
      Division wise rainfall for Maharashtra State (as on ${new Date().toLocaleDateString('en-GB')})
      Generated at: ${new Date().toLocaleString('en-GB')} (Rainfall in mm)
    `;

    // Add heading to PDF
    const lines = heading.split('\n');
    const leftMargin = 2;
    pdf.setFontSize(10);

    lines.forEach((line, index) => {
      pdf.text(line.trim(), leftMargin, 10 + (index * 10)); // Adjust the Y coordinate increment as needed
    });


    // Extract table data
    const tableElement = document.querySelector('.table') as HTMLTableElement;
    if (!tableElement) {
      console.error('Table element not found');
      return;
    }

    const columnsCount = tableElement.rows[0].cells.length;
    const tableData = [];
    const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell.textContent || '');

    for (let i = 1; i < tableElement.rows.length; i++) {
      const rowData = [];
      for (let j = 0; j < columnsCount; j++) {
        rowData.push(tableElement.rows[i].cells[j].textContent || '');
      }
      tableData.push(rowData);
    }

    // Define options for AutoTable
    const options = {
      theme: 'grid',
      margin: { top: 45, left: leftMargin, right: 0 }, // Adjust top margin to make space for the heading
      tableWidth: 'wrap', // Adjust table width to fit content
      styles: {
        fontSize: 7,
        fontStyle: 'bold',
        textColor: [0, 0, 0], // Set font color to black
        overflow: 'linebreak', // Reduce font size to fit more columns
      },
      columnStyles: {
        0: { cellWidth: 'wrap' }, // Example: wrap text in the first column
        // Add more column styles if needed
      },
      headStyles: {
        fillColor: null, // Remove header background color
        fontSize: 7, // Reduce header font size to fit more columns
        fontStyle: 'bold', // Set header font style to bold
        textColor: [0, 0, 0], // Set header font color to black
        lineWidth: 0.1, // Border line width
        lineColor: [0, 0, 0], // Border color (black)
      },
      didParseCell: (data: any) => {
        if (data.column.index >= 0 && data.column.index < columnsCount) {
          data.cell.styles.cellWidth = 'auto'; // Adjust cell width for each column
          data.cell.styles.lineWidth = 0.1; // Border line width for table data cells
          data.cell.styles.lineColor = [0, 0, 0]; // Border color for table data cells (black)
        }
      },
      didDrawPage: (data: any) => {
        // Add footer note after the table
        const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.setFontSize(7);
        pdf.text(footerText, leftMargin, data.cursor.y + 5); // Adjust Y position based on the table
      },
      head: [tableHeaders],
      body: tableData,
    };

    // Add table to PDF
    (pdf as any).autoTable(options);

    pdf.save('report.pdf');
}


downloadcirclePdf() {
    const pdf = new jsPDF('landscape', 'mm', 'a4');

    const headerElement = document.querySelector('.report-generated-bg');
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

    const generatedAtElement = headerElement.querySelector('.text-end span');
    const generatedAtText = generatedAtElement ? generatedAtElement.textContent : '';

    const rainfallUnitElement = headerElement.querySelector('.text-end span + br + span');
    const rainfallUnitText = rainfallUnitElement ? rainfallUnitElement.textContent : '';

    // Define heading
    const heading = `
      Rainfall Recording & Analysis
      Circles wise rainfall for ${districtName ? 'district ' + districtName + ' of ' : ''}division ${divisionName} (as on ${new Date().toLocaleDateString('en-GB')}})
      ${generatedAtText}  ${rainfallUnitText}

    `;

    // Split heading into lines
    const lines = heading.split('\n');
    const leftMargin = 2;


    // Extract table data
    const tableElement = document.querySelector('.table') as HTMLTableElement;
    if (!tableElement) {
      console.error('Table element not found');
      return;
    }
    const columnsCount = tableElement.rows[0].cells.length;
    const tableData:any[] = [];
     const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell?.textContent || '');
      // Process table body
      const bodyRows = tableElement.querySelectorAll('tbody tr');
      bodyRows.forEach(bodyRow => {
        const rowData: any[] = [];
        bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
          const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                         window.getComputedStyle(bodyCell).fontWeight === '700' ||
                         bodyCell.querySelector('b, strong');

          rowData.push({
            content: bodyCell.textContent || '',
            styles: {
              fontStyle: isBold ? 'bold' : 'normal'
            }
          });
        });
        tableData.push(rowData);
      });

  // Define options for AutoTable
  const options = {
    theme: 'grid',
    margin: { top: 30, left: leftMargin, right: leftMargin },
    styles: {
      fontSize: 7,
      textColor: [0, 0, 0],
      cellPadding: 1,
    },
    headStyles: {
      fillColor: null,
      fontStyle: 'bold',
      fontSize: 7,
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
    },
    bodyStyles: {
      lineWidth: 0.4,
     lineColor: [0, 0, 0], // Black color
    },
    didParseCell: (data :any) => {
      if (data.cell.raw) {
        data.cell.styles.minCellHeight = 5;
      }
    },

    didDrawPage: (data: any) => {
      if (data.pageNumber === 1) {
        pdf.setFontSize(10);
        lines.forEach((line, index) => {
          pdf.text(line.trim(), leftMargin, 10 + (index * 6));
        });
        data.settings.margin.top = 30;
      } else {
        data.settings.margin.top = 5;
      }

      const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(7);
      pdf.text(footerText, leftMargin, data.cursor.y + 4);
    },
    head: [tableHeaders],
    body: tableData,
    startY: 35

  };
  (pdf as any).autoTable(options);
   pdf.save('report.pdf');
}


downloadIntensityPdf() {
  const pdf = new jsPDF('portrait', 'mm', 'a4');
  const leftMargin = 5;
  const headerTextLines: string[] = [];
  const headerRow = document.querySelector('.report-generated-bg .row');
  if (!headerRow) {
    console.error('Header element not found');
    return;
  }
  const headerTitle = headerRow.querySelector('h5');
  const headerSubtitle = headerRow.querySelector('span');

  if (headerTitle && headerSubtitle) {
    headerTextLines.push(headerTitle.textContent?.trim() || '');
    headerTextLines.push(headerSubtitle.textContent?.trim() || '');
  }

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }

  const tableHeaders: any[][] = [];
  const tableData: any[] = [];

  // Process table headers
  const headerRows = tableElement.querySelectorAll('thead tr');
  headerRows.forEach(headerRow => {
    const rowHeaders: any[] = [];
    headerRow.querySelectorAll('th').forEach(headerCell => {
      const isBold = true; // All th tags should be bold
      rowHeaders.push({
        content: headerCell.textContent || '',
        colSpan: headerCell.colSpan,
        rowSpan: headerCell.rowSpan,
        styles: {
          halign: 'center',
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableHeaders.push(rowHeaders);
  });

  // Process table body
  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: any[] = [];
    bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
      const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
        window.getComputedStyle(bodyCell).fontWeight === '700' ||
        bodyCell.querySelector('b, strong');

      rowData.push({
        content: bodyCell.textContent || '',
        styles: {
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableData.push(rowData);
  });

  // Define options for AutoTable
  const options = {
    theme: 'grid',
    margin: { top: 30, left: leftMargin, right: leftMargin },
    styles: {
      fontSize: 9,
      textColor: [0, 0, 0],
      cellPadding: 1,
    },
    headStyles: {
      fillColor: null,
      fontSize: 9,
      lineWidth: 0.4,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontStyle: 'bold', // Ensure all header text is bold
    },
    bodyStyles: {
      lineWidth: 0.4,
      lineColor: [0, 0, 0], // Black color
    },
    didParseCell: (data: any) => {
      if (data.cell.raw) {
        data.cell.styles.minCellHeight = 5;
      }
    },
    didDrawPage: (data: any) => {
      if (data.pageNumber === 1) {
        // Add heading to the first page
        pdf.setFontSize(10);
        let yPosition = 10;
        headerTextLines.forEach(line => {
          pdf.text(line.trim(), leftMargin, yPosition);
          yPosition += 6; // Increment y position for next line
        });
        data.settings.margin.top = yPosition + 5; // Adjust top margin for the first page to account for the heading
      } else {
        data.settings.margin.top = 5; // Set top margin to 5 for all other pages
      }
      // Add footer note after the table
      const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(7);
      pdf.text(footerText, leftMargin, data.cursor.y + 4);
    },
    head: tableHeaders,
    body: tableData,
    startY: 28 // Initial start position for the first page (adjusted by didDrawPage for subsequent pages)
  };

  // Add table to PDF
  (pdf as any).autoTable(options);

  // Use headerSubtitle as the filename
  const filename = headerSubtitle ? headerSubtitle.textContent?.trim() || 'report' : 'report';
  pdf.save(`${filename}.pdf`);
}


GenerateCirclePercentagePDF(data: any[]) {
    const doc = new jsPDF('portrait', 'mm', 'a4');
    const maxRowsPerPage = 50; // Adjusted for better fit based on font size and layout
    const maxColumns = 6; // Number of columns per page
    const columnWidth = 33; // Adjusted based on your page size and number of columns
    const margin = 5; // Margin from the left

    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text('Rainfall Recording & Analysis', margin, 16); // Adjust the position as needed
    doc.setFont('normal');

    const currentDate = new Date();
    doc.setFontSize(12);
    const formattedDate = `State :: Maharashtra Circles Wise Percentage of Rain :: as on ${currentDate.getDate()},${currentDate.toLocaleString('default', { month: 'long' })}-${currentDate.getFullYear() }`;

    doc.text(formattedDate, margin, 22);

    let currentColumn = 0;
    let currentRow = 0;

    data.forEach((district: any) => {
      district.tehsils.forEach((tehsil: any) => {
        tehsil.circles.forEach((circle: any) => {
          let intensity = circle.circleIntensity;
          let color = this.getColor(intensity);
         this.addTableRow(doc, currentColumn, currentRow, circle.circleName, circle.circleIntensity, color, columnWidth, margin);
          currentRow++;
          if (currentRow >= maxRowsPerPage) {
            currentRow = 0;
            currentColumn++;
            if (currentColumn >= maxColumns) {
              doc.addPage();
              currentColumn = 0;
            }
          }
        });
        let intensity = tehsil.tehsilIntensity;
        let color = this.getColor(intensity);
        this.addTableRow(doc, currentColumn, currentRow, `T-${tehsil.tehsilName}`, tehsil.tehsilIntensity, color, columnWidth, margin);
        currentRow++;
        if (currentRow >= maxRowsPerPage) {
          currentRow = 0;
          currentColumn++;
          if (currentColumn >= maxColumns) {
            doc.addPage();
            currentColumn = 0;
          }
        }
      });
      let intensity = district.districtIntensity;
      let color = this.getColor(intensity);
      this.addTableRow(doc, currentColumn, currentRow, `D-${district.districtName}`, district.districtIntensity, color, columnWidth, margin);
      currentRow++;
      if (currentRow >= maxRowsPerPage) {
        currentRow = 0;
        currentColumn++;
        if (currentColumn >= maxColumns) {
          doc.addPage();
          currentColumn = 0;
        }
      }
    });

    doc.addPage();
    doc.setFontSize(9);
    doc.setFont("times",'bold');
    const footerText = "* The data subject to change within 3 days due to late reception of data and/or it is will adopted from the nearest circle in the case of missing data.";
    doc.text(footerText, margin, 10);
    doc.save(`${formattedDate}.pdf`);
}

addTableRow(doc: any, column: number, row: number, name: string, intensity: number, color: number[], columnWidth: number, margin: number) {
    const startX = margin + (column * columnWidth); // Adjust the column width and starting X position as needed
    const startY = 35 + (row * 5); // Adjust the row height and starting Y position as needed

    doc.setDrawColor(0, 0, 0); // Set border color
    doc.setLineWidth(0.1); // Set border thickness
    doc.rect(startX, startY - 4, columnWidth, 5); // Draw border with smaller height

    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.setFontSize(8); // Set font size
    doc.text(name, startX + 2, startY - 1); // Adjusted text position for better alignment

    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(startX + columnWidth * 0.7, startY - 4, columnWidth * 0.3, 5, 'F'); // Adjust the rectangle position and size as needed

    doc.text(`${intensity}`, startX + columnWidth * 0.8, startY - 1);
    // Adjusted text position for intensity
}

getColor(intensity: number): number[] {
    if (intensity < 25) {
      return [255, 0, 0]; // red
    } else if (intensity >= 25 && intensity < 50) {
      return [237, 255, 0]; // yellow
    } else if (intensity >= 50 && intensity < 75) {
      return [119, 110, 254]; // blue
    } else if (intensity >= 75 && intensity < 100) {
      return [0, 220, 103]; // light green
    } else {
      return [0, 100, 0]; // dark green
    }
}


GenerateTehsilPercentagePDF(data: any[]) {
    const doc = new jsPDF('portrait', 'mm', 'a4');
    const maxRowsPerPage = 50; // Adjusted for better fit based on font size and layout
    const maxColumns = 6; // Number of columns per page
    const columnWidth = 33; // Adjusted based on your page size and number of columns
    const margin = 5; // Margin from the left

    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text('Rainfall Recording & Analysis', margin, 16); // Adjust the position as needed
    doc.setFont('normal');

    const currentDate = new Date();
    doc.setFontSize(12);
    const formattedDate = `(State :: Maharashtra Tehsil Wise Percentage of Rain :: as on ${currentDate.getDate()},${currentDate.toLocaleString('default', { month: 'long' })}-${currentDate.getFullYear()})`;

    doc.text(formattedDate, margin, 22);

    let currentColumn = 0;
    let currentRow = 0;

    data.forEach((district: any) => {
      district.tehsils.forEach((tehsil: any) => {
        let intensity = tehsil.tehsilIntensity;
        let color = this.getColor(intensity);
        this.addTableRow(doc, currentColumn, currentRow, `${tehsil.tehsilName}`, tehsil.tehsilIntensity, color, columnWidth, margin);
        currentRow++;
        if (currentRow >= maxRowsPerPage) {
          currentRow = 0;
          currentColumn++;
          if (currentColumn >= maxColumns) {
            doc.addPage();
            currentColumn = 0;
          }
        }
      });
      let intensity = district.districtIntensity;
      let color = this.getColor(intensity);
      this.addTableRow(doc, currentColumn, currentRow, `D-${district.districtName}`, district.districtIntensity, color, columnWidth, margin);
      currentRow++;
      if (currentRow >= maxRowsPerPage) {
        currentRow = 0;
        currentColumn++;
        if (currentColumn >= maxColumns) {
          doc.addPage();
          currentColumn = 0;
        }
      }
    });

    doc.addPage();
    doc.setFontSize(9);
    doc.setFont("times",'bold');
    const footerText = "* The data subject to change within 3 days due to late reception of data and/or it is will adopted from the nearest circle in the case of missing data.";
    doc.text(footerText, margin, 4);
    doc.save(`${formattedDate}.pdf`);
}

generateDistrictPDF(data: any[]) {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const margin = 10;
  const columnWidth = 30;
  const cellHeight = 6;
  const cellPadding = 2;
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const maxColumns = Math.floor((pageWidth - margin * 2) / columnWidth);
  let currentColumn = 0;
  let currentY = 30;

  doc.setFontSize(12);
  doc.setFont('bold');
  doc.text('Rainfall Recording & Analysis', margin, 16);
  doc.setFont('normal');

  const currentDate = new Date();
  doc.setFontSize(10);
  const formattedDate = `(State :: Maharashtra District Wise Percentage of Rain :: as on ${currentDate.getDate()}, ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()})`;
  doc.text(formattedDate, margin, 22);

  data.forEach((division: any) => {
      const startX = margin + (currentColumn * columnWidth);

      currentY += cellHeight;

      // Add table headers
      doc.setFontSize(8);
      doc.setFont('bold');
      doc.text('Name', startX + 10, currentY-1, { align: 'center' });
      doc.text('%', startX + 25, currentY-1, { align: 'center' });
      doc.setFont('normal');

      // Draw header borders
      doc.rect(startX, currentY - cellHeight, 20, cellHeight);
      doc.rect(startX + 20, currentY - cellHeight, 10, cellHeight);

      currentY += cellHeight;

      division.districts.forEach((district: any) => {
          if (currentY > pageHeight - margin - 20) { // Adjust for footer space
              currentColumn++;
              if (currentColumn >= maxColumns) {
                  doc.addPage();
                  currentColumn = 0;
              }
              currentY = 30;
          }

          let intensity = district.intensity;
          let color = this.getDistrictColor(intensity);

          // Set fill color for intensity
          doc.setFillColor(color);
          doc.rect(startX + 20, currentY - cellHeight, 10, cellHeight, 'F');

          // Add district name and intensity, centered in cells
          doc.setFontSize(8);
          doc.text(district.district_name, startX + 10, currentY - cellPadding, { align: 'center' });
          doc.text(intensity.toString(), startX + 25, currentY - cellPadding, { align: 'center' });

          // Draw borders for each row
          doc.rect(startX, currentY - cellHeight, 20, cellHeight);
          doc.rect(startX + 20, currentY - cellHeight, 10, cellHeight);

          currentY += cellHeight;
      });

      // Add division intensity at the end of the list
      if (currentY > pageHeight - margin - 20) { // Adjust for footer space
          currentColumn++;
          if (currentColumn >= maxColumns) {
              doc.addPage();
              currentColumn = 0;
          }
          currentY = 30;
      }

      let divisionIntensityColor = this.getDistrictColor(division.intensity);

      // Set fill color for division intensity
      doc.setFillColor(divisionIntensityColor);
      doc.rect(startX + 20, currentY - cellHeight, 10, cellHeight, 'F');

      // Add division name and intensity, centered in cells
      doc.setFontSize(8);
      doc.text(division.division_name, startX + 10, currentY - cellPadding, { align: 'center' });
      doc.text(division.intensity.toString(), startX + 25, currentY - cellPadding, { align: 'center' });

      // Draw borders for division row
      doc.rect(startX, currentY - cellHeight, 20, cellHeight);
      doc.rect(startX + 20, currentY - cellHeight, 10, cellHeight);

      currentColumn++;
      if (currentColumn >= maxColumns) {
          currentColumn = 0;
          currentY += cellHeight;
      } else {
          currentY = 30;
      }
  });

  // Ensure footer is placed at the correct position below the content
  if (currentY + 15 > pageHeight - margin) {
      doc.addPage();
      currentY = 30;
  } else {
      currentY += 15;
  }

  doc.setFontSize(9);
  doc.setFont("times", 'bold');
  const footerText = "* The data is subject to change within 3 days due to late reception of data and/or it is adopted from the nearest circle in the case of missing data.";
  doc.text(footerText, margin, pageHeight - margin);

  doc.save(`${formattedDate}.pdf`);
}




getDistrictColor(intensity: any) {
  if (intensity < 25) {
      return '#FF0000';
  } else if (intensity >= 25 && intensity < 50) {
      return '#EDFF00';
  } else if (intensity >= 50 && intensity < 75) {
      return '#776EFE';
  } else if (intensity >= 75 && intensity < 100) {
      return '#00DC67';
  } else {
      return '#006400';
  }
}



getDivisionColor(intensity: any) {


  if (intensity < 25) {
    return '#FF0000';
  } else if (intensity >= 25 && intensity < 50) {
    return '#EDFF00';
  } else if (intensity >= 50 && intensity < 75) {
    return '#776EFE';
  } else if (intensity >= 75 && intensity < 100) {
    return '#00DC67';
  } else {
    return '#006400';
  }
}

downloadcurrentyearPdf() {
  console.log('printing pdf ');
  const pdf = new jsPDF('landscape', 'mm', 'a4');

  // Extract header information
  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }

  const headerTextLines: string[] = [];
  let subtitleText = '';  // Variable to store subtitle text

  // Extract the relevant heading text
  const rowElements = headerElement.querySelectorAll('.row');
  rowElements.forEach(row => {
    const colLeft = row.querySelector('.col-sm-6');
    const colRight = row.querySelector('.text-end');

    if (colLeft && colRight) {
      const title = colLeft.querySelector('h5')?.textContent;
      subtitleText = colLeft.querySelector('span')?.textContent || '';  // Get subtitle
      const generatedAt = colRight.querySelector('span')?.textContent;

      if (title) headerTextLines.push(title);
      if (subtitleText) headerTextLines.push(subtitleText);
      if (generatedAt) headerTextLines.push(generatedAt);

      const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;
      if (rainfallText) headerTextLines.push(rainfallText);
    }
  });

  const leftMargin = 5;

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }

  const tableHeaders: any[][] = [];
  const tableData: any[] = [];

  // Process table headers
  const headerRows = tableElement.querySelectorAll('thead tr');
  headerRows.forEach(headerRow => {
    const rowHeaders: any[] = [];
    headerRow.querySelectorAll('th').forEach(headerCell => {
      const isBold = true; // All th tags should be bold

      rowHeaders.push({
        content: headerCell.textContent || '',
        colSpan: headerCell.colSpan,
        rowSpan: headerCell.rowSpan,
        styles: {
          halign: 'center',
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableHeaders.push(rowHeaders);
  });

  // Process table body
  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: any[] = [];
    bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
      const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                     window.getComputedStyle(bodyCell).fontWeight === '700' ||
                     bodyCell.querySelector('b, strong');

      rowData.push({
        content: bodyCell.textContent || '',
        styles: {
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableData.push(rowData);
  });

  const options = {
    theme: 'grid',
    margin: { top: 30, left: leftMargin, right: leftMargin },
    styles: {
      fontSize: 9,
      font: 'times',
      textColor: [0, 0, 0],
      cellPadding: 1,
    },
    headStyles: {
      fillColor: null,
      fontSize: 9,
      font: 'times',
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontStyle: 'bold',
    },
    bodyStyles: {
      lineColor: [0, 0, 0],
    },
    didParseCell: (data: any) => {
      if (data.cell.raw) {
        data.cell.styles.minCellHeight = 5;
      }
    },
    didDrawPage: (data: any) => {
      if (data.pageNumber === 1) {

        pdf.setFontSize(10);
        headerTextLines.forEach((line, index) => {
          pdf.text(line.trim(), leftMargin, 10 + (index * 6));
        });
        data.settings.margin.top = 10 + (headerTextLines.length * 6);
      } else {
        data.settings.margin.top = 5;
      }

      const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(9);
      pdf.setFont('bold');
      pdf.text(footerText, leftMargin, data.cursor.y + 4);
    },
    head: tableHeaders,
    body: tableData,
    startY: 35
  };

  (pdf as any).autoTable(options);

  const fileName = subtitleText || 'report';
  pdf.save(`${fileName}.pdf`);
}


downloadTehsilReportPdf() {

  const pdf = new jsPDF('landscape', 'mm', 'a4');

  // Extract header information
  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }

  const headerTextLines: string[] = [];

  // Extract the relevant heading text
  const rowElements = headerElement.querySelectorAll('.row');
  rowElements.forEach(row => {
    const colLeft = row.querySelector('.col-sm-6');
    const colRight = row.querySelector('.text-end');

    if (colLeft && colRight) {
      const title = colLeft.querySelector('h5')?.textContent;
      const subtitle = colLeft.querySelector('span')?.textContent;
      const generatedAt = colRight.querySelector('span')?.textContent;

      if (title) headerTextLines.push(title);
      if (subtitle) headerTextLines.push(subtitle);
      if (generatedAt) headerTextLines.push(generatedAt);

      const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;
      if (rainfallText) headerTextLines.push(rainfallText);
    }
  });

  const leftMargin = 5;

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }

  const tableHeaders: any[][] = [];
  const tableData: any[] = [];

  // Process table headers
  const headerRows = tableElement.querySelectorAll('thead tr');
  headerRows.forEach(headerRow => {
    const rowHeaders: any[] = [];
    headerRow.querySelectorAll('th').forEach(headerCell => {
      const isBold = true; // All th tags should be bold

      rowHeaders.push({
        content: headerCell.textContent || '',
        colSpan: headerCell.colSpan,
        rowSpan: headerCell.rowSpan,
        styles: {
          halign: 'center',
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableHeaders.push(rowHeaders);
  });

  // Process table body
  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: any[] = [];
    bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
      const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                     window.getComputedStyle(bodyCell).fontWeight === '700' ||
                     bodyCell.querySelector('b, strong');

      rowData.push({
        content: bodyCell.textContent || '',
        styles: {
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableData.push(rowData);
  });

  const options = {
    theme: 'grid',
    margin: { top: 30, left: leftMargin, right: leftMargin },
    styles: {
      fontSize: 9,
      font:'times',
      textColor: [0, 0, 0],
      cellPadding: 1,
    },
    headStyles: {
      fillColor: null,
      fontSize: 9,
      font:'times',
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontStyle: 'bold',
    },
    bodyStyles: {
      lineColor: [0, 0, 0],
    },
    didParseCell: (data: any) => {
      if (data.cell.raw) {
        data.cell.styles.minCellHeight = 5;
      }
    },
    didDrawPage: (data: any) => {
      if (data.pageNumber === 1) {
        pdf.setFontSize(10);
        headerTextLines.forEach((line, index) => {
          pdf.text(line.trim(), leftMargin, 10 + (index * 6));
        });
        data.settings.margin.top = 10 + (headerTextLines.length * 6);
      } else {
        data.settings.margin.top = 5;
      }

      const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(9);
      pdf.setFont('bold');
      pdf.text(footerText, leftMargin, data.cursor.y + 4);
    },
    head: tableHeaders,
    body: tableData,
    startY: 35
  };
  (pdf as any).autoTable(options);
  pdf.save('tehsilwisereport.pdf');
}


downloadReportsDivisionPdf() {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
      console.error('Header element not found');
      return;
  }

  const headerTextLines: string[] = [];
  let subtitle='';
  const rowElements = headerElement.querySelectorAll('.row');
  rowElements.forEach(row => {
      const colLeft = row.querySelector('.col-sm-6:nth-child(1)');
      const colRight = row.querySelector('.col-sm-6:nth-child(2)');

      if (colLeft) {

          const title = colLeft.querySelector('h5')?.textContent;
          subtitle = colLeft.querySelector('span')?.textContent || '';
             console.log(subtitle,'subtitle');
          if (title) headerTextLines.push(title.trim());
          if (subtitle) headerTextLines.push(subtitle.trim());
      }

      if (colRight) {
          const generatedAt = colRight.querySelector('span')?.textContent;
          if (generatedAt) headerTextLines.push(generatedAt.trim());
      }
  });

  const leftMargin = 10;

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
      console.error('Table element not found');
      return;
  }

  const tableHeaders: any[][] = [];
  const tableData: any[] = [];

  // Process table headers
  const headerRows = tableElement.querySelectorAll('thead tr');
  headerRows.forEach(headerRow => {
      const rowHeaders: any[] = [];
      headerRow.querySelectorAll('th').forEach(headerCell => {
          const isBold = true; // All th tags should be bold

          rowHeaders.push({
              content: headerCell.textContent || '',
              colSpan: headerCell.colSpan,
              rowSpan: headerCell.rowSpan,
              styles: {
                  halign: 'center',
                  fontStyle: isBold ? 'bold' : 'normal'
              }
          });
      });
      tableHeaders.push(rowHeaders);
  });

  // Process table body
  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
      const rowData: any[] = [];
      bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
          const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                       window.getComputedStyle(bodyCell).fontWeight === '700' ||
                       bodyCell.querySelector('b, strong');

          rowData.push({
              content: bodyCell.textContent || '',
              styles: {
                  fontStyle: isBold ? 'bold' : 'normal'
              }
          });
      });
      tableData.push(rowData);
  });

  // Define options for AutoTable
  const options = {
      theme: 'grid',
      margin: { top: 30, left: leftMargin, right: leftMargin },
      styles: {
          fontSize: 9,
          textColor: [0, 0, 0],
          cellPadding: 1,
      },
      headStyles: {
          fillColor: null,
          fontSize: 9,
          lineWidth: 0.1,
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          fontStyle: 'bold', // Ensure all header text is bold
      },
      bodyStyles: {
          lineColor: [0, 0, 0], // Black color
      },
      didParseCell: (data: any) => {
          if (data.cell.raw) {
              data.cell.styles.minCellHeight = 5;
          }
      },
      didDrawPage: (data: any) => {
          if (data.pageNumber === 1) {
              // Add heading to the first page
              pdf.setFontSize(10);
              headerTextLines.forEach((line, index) => {
                  pdf.text(line.trim(), leftMargin, 10 + (index * 6));
              });
              data.settings.margin.top = 10 + (headerTextLines.length * 6); // Adjust top margin for the first page to account for the heading
          } else {
              data.settings.margin.top = 5; // Set top margin to 5 for all other pages
          }
          // Add footer note after the table
          const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
          const pageHeight = pdf.internal.pageSize.getHeight();
          pdf.setFontSize(8);
          pdf.setFont('bold');
          pdf.text(footerText, leftMargin, data.cursor.y + 4);
      },
      head: tableHeaders,
      body: tableData,
      startY: 35 // Initial start position for the first page (adjusted by didDrawPage for subsequent pages)
  };

  // Add table to PDF
  (pdf as any).autoTable(options);
  const fileName = subtitle || 'report';
  pdf.save(`${fileName}.pdf`);


}


downloaddryspellPdf() {
        console.log('printing pdf');
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const headerElement = document.querySelector('.report-generated-bg');
        if (!headerElement) {
          console.error('Header element not found');
          return;
        }

        const headerTextLines: string[] = [];

        const rowElements = headerElement.querySelectorAll('.row');
        rowElements.forEach(row => {
          const colLeft = row.querySelector('.col-sm-6');
          const colRight = row.querySelector('.text-end');

          if (colLeft && colRight) {
            const title = colLeft.querySelector('h5')?.textContent;
            const subtitle = colLeft.querySelector('span')?.textContent;
            const generatedAt = colRight.querySelector('span')?.textContent;

            if (title) headerTextLines.push(title);
            if (subtitle) headerTextLines.push(subtitle);
            if (generatedAt) headerTextLines.push(generatedAt);

            const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;
            if (rainfallText) headerTextLines.push(rainfallText);
          }
        });

        const leftMargin = 5;

        // Extract table data
        const tableElement = document.querySelector('.table') as HTMLTableElement;
        if (!tableElement) {
          console.error('Table element not found');
          return;
        }

        const tableHeaders: any[][] = [];
        const tableData: any[] = [];

        // Process table headers
        const headerRows = tableElement.querySelectorAll('thead tr');
        headerRows.forEach(headerRow => {
          const rowHeaders: any[] = [];
          headerRow.querySelectorAll('th').forEach(headerCell => {
            const isBold = true; // All th tags should be bold

            rowHeaders.push({
              content: headerCell.textContent || '',
              colSpan: headerCell.colSpan,
              rowSpan: headerCell.rowSpan,
              styles: {
                halign: 'center',
                fontStyle: isBold ? 'bold' : 'normal'
              }
            });
          });
          tableHeaders.push(rowHeaders);
        });

        // Process table body
        const bodyRows = tableElement.querySelectorAll('tbody tr');
        bodyRows.forEach(bodyRow => {
          const rowData: any[] = [];
          bodyRow.querySelectorAll('td').forEach((bodyCell, index) => {
            const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                           window.getComputedStyle(bodyCell).fontWeight === '700' ||
                           bodyCell.querySelector('b, strong');

            rowData.push({
              content: bodyCell.textContent || '',
              styles: {
                fontStyle: isBold ? 'bold' : 'normal'
              }
            });

            // Check for nested data in DateData array
            if (index === 3) { // Assuming 3rd index is where DateData starts
              const DateData = bodyCell.querySelectorAll('td');
              DateData.forEach(dateCell => {
                rowData.push({
                  content: dateCell.textContent || '',
                  styles: {
                    fontStyle: isBold ? 'bold' : 'normal'
                  }
                });
              });
            }
          });
          tableData.push(rowData);
        });

        // Define options for AutoTable
        const options = {
          theme: 'grid',
          margin: { top: 30, left: leftMargin, right: leftMargin },
          styles: {
            fontSize: 9,
            textColor: [0, 0, 0],
            cellPadding: 1,
          },
          headStyles: {
            fillColor: null,
            fontSize: 9,
            lineWidth: 0.1,
            textColor: [0, 0, 0],
            lineColor: [0, 0, 0],
            fontStyle: 'bold', // Ensure all header text is bold
          },
          bodyStyles: {
            lineColor: [0, 0, 0], // Black color
          },
          didParseCell: (data: any) => {
            if (data.cell.raw) {
              data.cell.styles.minCellHeight = 5;
            }
          },
          didDrawPage: (data: any) => {
            if (data.pageNumber === 1) {
              // Add heading to the first page
              pdf.setFontSize(10);
              headerTextLines.forEach((line, index) => {
                pdf.text(line.trim(), leftMargin, 10 + (index * 6));
              });
              data.settings.margin.top = 10 + (headerTextLines.length * 6); // Adjust top margin for the first page to account for the heading
            } else {
              data.settings.margin.top = 5; // Set top margin to 5 for all other pages
            }
            // Add footer note after the table
            const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
            const pageHeight = pdf.internal.pageSize.getHeight();
            pdf.setFontSize(8);
            pdf.setFont('bold');
            pdf.text(footerText, leftMargin, pageHeight - 10);
          },
          head: tableHeaders,
          body: tableData,
          startY: 35 // Initial start position for the first page (adjusted by didDrawPage for subsequent pages)
        };

        // Add table to PDF
        (pdf as any).autoTable(options);

        pdf.save('report.pdf');
}


GeneratedivisionPdF() {
        const pdf = new jsPDF('landscape', 'mm', 'a4');

        const headerElement = document.querySelector('.report-generated-bg');
        if (!headerElement) {
          console.error('Header element not found');
          return;
        }


        const dateElement = headerElement.querySelector('span:nth-of-type(2)');
        const dateText = dateElement ? dateElement.textContent : '';

        const generatedAtElement = headerElement.querySelector('.text-end span');
        const generatedAtText = generatedAtElement ? generatedAtElement.textContent : '';

        const rainfallUnitElement = headerElement.querySelector('.text-end span + br + span');
        const rainfallUnitText = rainfallUnitElement ? rainfallUnitElement.textContent : '';

        // Define heading
        const heading = `
          Rainfall Recording & Analysis
          Division wise rainfall for Maharashtra State (as on ${new Date().toLocaleDateString('en-GB')}})
          ${generatedAtText}  ${rainfallUnitText}

        `;

        // Split heading into lines
        const lines = heading.split('\n');
        const leftMargin = 2;


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

      // Define options for AutoTable
      const options = {
        theme: 'grid',
        margin: { top: 30, left: leftMargin, right: leftMargin },

        styles: {
          fontSize: 8,
          font:'times',
          textColor: [0, 0, 0],
          cellPadding: 1,
        },
        headStyles: {
          fillColor: null,
          fontSize: 8,
          font:'times',
          lineWidth: 0.1,
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          fontStyle: 'bold',
        },
        bodyStyles: {
          lineColor: [0, 0, 0],
        },
        didParseCell: (data :any) => {
          if (data.cell.raw) {
            data.cell.styles.minCellHeight = 5;
          }
        },

        didDrawPage: (data: any) => {
          if (data.pageNumber === 1) {
            pdf.setFontSize(10);
            lines.forEach((line, index) => {
              pdf.text(line.trim(), leftMargin, 10 + (index * 6));
            });
            data.settings.margin.top = 30;
          } else {
            data.settings.margin.top = 5;
          }

          const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
          const pageHeight = pdf.internal.pageSize.getHeight();
          pdf.setFontSize(7);
          pdf.text(footerText, leftMargin, data.cursor.y + 4);
        },
        head: [tableHeaders],
        body: tableData,
        startY: 35

      };
      (pdf as any).autoTable(options);
       pdf.save('report.pdf');
}


heavyrainPdf() {
  const pdf = new jsPDF('portrait', 'mm', 'a4');

  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }

  const headerTextLines: string[] = [];
  const rowElements = headerElement.querySelectorAll('.row');
  rowElements.forEach(row => {
    const colLeft = row.querySelector('.col-sm-6');
    const colRight = row.querySelector('.text-end');

    if (colLeft && colRight) {
      const title = colLeft.querySelector('h5')?.textContent;
      const subtitle = colLeft.querySelector('span')?.textContent;
      const generatedAt = colRight.querySelector('span')?.textContent;

      if (title) headerTextLines.push(title);
      if (subtitle) headerTextLines.push(subtitle);
      if (generatedAt) headerTextLines.push(generatedAt);

      const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;
      if (rainfallText) headerTextLines.push(rainfallText);
    }
  });

  const leftMargin = 5;

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }
  //const tableHeaders: any[][] = [];
  const tableHeaders: any[][] = [[
    { content: 'Sr', styles: { halign: 'center', fontStyle: 'bold' } },
    { content: 'Division', styles: { halign: 'center', fontStyle: 'bold' } },
    { content: 'District', styles: { halign: 'center', fontStyle: 'bold' } },
    { content: ' ', styles: { halign: 'center', fontStyle: 'bold' } },
  ]];

  const tableData: any[] = [];
  // Process table body
  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: string[] = [];
    bodyRow.querySelectorAll('td').forEach((td, index) => {
     console.log(bodyRow,'bodyrow')
       if (index < 3) {
        rowData.push(td.textContent || '');
       }
    });

    // Get the nested date and rain data
    let nestedData: string[] = [];
    bodyRow.querySelectorAll('td').forEach((nestedCell, index) => {
      if (index >= 3) {
        nestedData.push(nestedCell.textContent || '');
      }
    });
   rowData.push(nestedData.join(' '));
    tableData.push(rowData);
  });

  const options = {
    theme: 'grid',
    margin: { top: 30, left: leftMargin, right: leftMargin },
    styles: {
      fontSize: 9,
      font: 'times',
      textColor: [0, 0, 0],
      cellPadding: 1,
    },
    headStyles: {
      fillColor: null,
      fontSize: 9,
      font: 'times',
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontStyle: 'bold',
    },
    bodyStyles: {
      lineColor: [0, 0, 0],
    },
    didParseCell: (data: any) => {
      if (data.cell.raw) {
        data.cell.styles.minCellHeight = 5;
      }
    },
    didDrawPage: (data: any) => {
      if (data.pageNumber === 1) {
        pdf.setFontSize(10);
        headerTextLines.forEach((line, index) => {
          pdf.text(line.trim(), leftMargin, 10 + (index * 6));
        });
        data.settings.margin.top = 10 + (headerTextLines.length * 6);
      } else {
        data.settings.margin.top = 5;
      }

      const footerText = "* The data is subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
     // const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(9);
      pdf.setFont('bold');
      pdf.text(footerText, leftMargin, data.cursor.y + 4);
    },
    head: tableHeaders,
    body: tableData,
    startY: 35
  };

  (pdf as any).autoTable(options);

  pdf.save('report.pdf');
}



divisionheavyrainPdf() {
  const pdf = new jsPDF('portrait', 'mm', 'a4');

  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }

  const headerTextLines: string[] = [];
  const rowElements = headerElement.querySelectorAll('.row');
  rowElements.forEach(row => {
    const colLeft = row.querySelector('.col-sm-6');
    const colRight = row.querySelector('.text-end');

    if (colLeft && colRight) {
      const title = colLeft.querySelector('h5')?.textContent;
      const subtitle = colLeft.querySelector('span')?.textContent;
      const generatedAt = colRight.querySelector('span')?.textContent;

      if (title) headerTextLines.push(title);
      if (subtitle) headerTextLines.push(subtitle);
      if (generatedAt) headerTextLines.push(generatedAt);

      const rainfallText = colRight.querySelector('span:nth-child(3)')?.textContent;
      if (rainfallText) headerTextLines.push(rainfallText);
    }
  });

  const leftMargin = 5;

  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }
  //const tableHeaders: any[][] = [];
  const tableHeaders: any[][] = [[
    { content: 'Sr', styles: { halign: 'center', fontStyle: 'bold' } },
    { content: 'Division', styles: { halign: 'center', fontStyle: 'bold' } },
    // { content: 'District', styles: { halign: 'center', fontStyle: 'bold' } },
    { content: ' ', styles: { halign: 'center', fontStyle: 'bold' } },
  ]];

  const tableData: any[] = [];
  // Process table body
  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: string[] = [];
    bodyRow.querySelectorAll('td').forEach((td, index) => {
     console.log(bodyRow,'bodyrow')
       if (index < 2) {
        rowData.push(td.textContent || '');
       }
    });

    // Get the nested date and rain data
    let nestedData: string[] = [];
    bodyRow.querySelectorAll('td').forEach((nestedCell, index) => {
      if (index >= 2) {
        nestedData.push(nestedCell.textContent || '');
      }
    });
   rowData.push(nestedData.join(' '));
    tableData.push(rowData);
  });

  const options = {
    theme: 'grid',
    margin: { top: 30, left: leftMargin, right: leftMargin },
    styles: {
      fontSize: 9,
      font: 'times',
      textColor: [0, 0, 0],
      cellPadding: 1,
    },
    headStyles: {
      fillColor: null,
      fontSize: 9,
      font: 'times',
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontStyle: 'bold',
    },
    bodyStyles: {
      lineColor: [0, 0, 0],
    },
    didParseCell: (data: any) => {
      if (data.cell.raw) {
        data.cell.styles.minCellHeight = 5;
      }
    },
    didDrawPage: (data: any) => {
      if (data.pageNumber === 1) {
        pdf.setFontSize(10);
        headerTextLines.forEach((line, index) => {
          pdf.text(line.trim(), leftMargin, 10 + (index * 6));
        });
        data.settings.margin.top = 10 + (headerTextLines.length * 6);
      } else {
        data.settings.margin.top = 5;
      }

      const footerText = "* The data is subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
     // const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(9);
      pdf.setFont('bold');
      pdf.text(footerText, leftMargin, data.cursor.y + 4);
    },
    head: tableHeaders,
    body: tableData,
    startY: 35
  };

  (pdf as any).autoTable(options);

  pdf.save('report.pdf');
}



downloadTehsilPdf() {
  const pdf = new jsPDF('landscape', 'mm', 'a4');

  const headerElement = document.querySelector('.report-generated-bg');
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

  const generatedAtElement = headerElement.querySelector('.text-end span');
  const generatedAtText = generatedAtElement ? generatedAtElement.textContent : '';

  const rainfallUnitElement = headerElement.querySelector('.text-end span + br + span');
  const rainfallUnitText = rainfallUnitElement ? rainfallUnitElement.textContent : '';

  // Define heading
  const heading = `
    Rainfall Recording & Analysis
    Tehsils wise rainfall for ${districtName ? 'district ' + districtName + ' of ' : ''}division ${divisionName} (as on ${new Date().toLocaleDateString('en-GB')}})
    ${generatedAtText}  ${rainfallUnitText}

  `;

  // Split heading into lines
  const lines = heading.split('\n');
  const leftMargin = 2;


  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }
  const columnsCount = tableElement.rows[0].cells.length;

  const tableData:any[]= [];
  const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell?.textContent || '');

  // for (let i = 1; i < tableElement.rows.length; i++) {
  //   const rowData = [];
  //   for (let j = 0; j < columnsCount; j++) {
  //     const cell = tableElement.rows[i]?.cells[j];
  //     rowData.push(cell?.textContent || '');
  //   }
  //   tableData.push(rowData);
  // }

  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: any[] = [];
    bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
      const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                     window.getComputedStyle(bodyCell).fontWeight === '700' ||
                     bodyCell.querySelector('b, strong');

      rowData.push({
        content: bodyCell.textContent || '',
        styles: {
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableData.push(rowData);
  });


// Define options for AutoTable
const options = {
  theme: 'grid',
  margin: { top: 30, left: leftMargin, right: leftMargin },
  styles: {
    fontSize: 7,
    textColor: [0, 0, 0],
    cellPadding: 1,
  },
  headStyles: {
    fillColor: null,
    fontStyle: 'bold',
    fontSize: 7,
    lineWidth: 0.1,
    textColor: [0, 0, 0],
    lineColor: [0, 0, 0],
    },
    bodyStyles: {
      lineColor: [0, 0, 0],
    },
  didParseCell: (data :any) => {
    if (data.cell.raw) {
      data.cell.styles.minCellHeight = 5;
    }
  },

  didDrawPage: (data: any) => {
    if (data.pageNumber === 1) {
      pdf.setFontSize(10);
      lines.forEach((line, index) => {
        pdf.text(line.trim(), leftMargin, 10 + (index * 6));
      });
      data.settings.margin.top = 30;
    } else {
      data.settings.margin.top = 5;
    }

    const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(7);
    pdf.text(footerText, leftMargin, data.cursor.y + 4);
  },
  head: [tableHeaders],
  body: tableData,
  startY: 35

};
(pdf as any).autoTable(options);
 pdf.save('report.pdf');
}



GeneratedistrictPdF() {
  const pdf = new jsPDF('landscape', 'mm', 'a4'); // Landscape mode for more width

  // Extract content from HTML header
  const headerElement = document.querySelector('.report-generated-bg');
  if (!headerElement) {
    console.error('Header element not found');
    return;
  }


  const dateElement = headerElement.querySelector('span:nth-of-type(2)');
  const dateText = dateElement ? dateElement.textContent : '';

  const generatedAtElement = headerElement.querySelector('.text-end span');
  const generatedAtText = generatedAtElement ? generatedAtElement.textContent : '';

  const rainfallUnitElement = headerElement.querySelector('.text-end span + br + span');
  const rainfallUnitText = rainfallUnitElement ? rainfallUnitElement.textContent : '';

  // Define heading
  const heading = `
    Rainfall Recording & Analysis
    Districts wise rainfall for Maharashtra State (as on ${new Date().toLocaleDateString('en-GB')}})
    ${generatedAtText}  ${rainfallUnitText}

  `;

  // Split heading into lines
  const lines = heading.split('\n');
  const leftMargin = 2;


  // Extract table data
  const tableElement = document.querySelector('.table') as HTMLTableElement;
  if (!tableElement) {
    console.error('Table element not found');
    return;
  }
  const columnsCount = tableElement.rows[0].cells.length;
  const tableData:any[] = [];
  const tableHeaders = Array.from(tableElement.rows[0].cells).map(cell => cell?.textContent || '');

  // for (let i = 1; i < tableElement.rows.length; i++) {
  //   const rowData = [];
  //   for (let j = 0; j < columnsCount; j++) {
  //     const cell = tableElement.rows[i]?.cells[j];
  //     rowData.push(cell?.textContent || '');
  //   }
  //   tableData.push(rowData);
  // }

  const bodyRows = tableElement.querySelectorAll('tbody tr');
  bodyRows.forEach(bodyRow => {
    const rowData: any[] = [];
    bodyRow.querySelectorAll('td, th').forEach(bodyCell => {
      const isBold = bodyCell.tagName === 'TH' || window.getComputedStyle(bodyCell).fontWeight === 'bold' ||
                     window.getComputedStyle(bodyCell).fontWeight === '700' ||
                     bodyCell.querySelector('b, strong');

      rowData.push({
        content: bodyCell.textContent || '',
        styles: {
          fontStyle: isBold ? 'bold' : 'normal'
        }
      });
    });
    tableData.push(rowData);
  });

// Define options for AutoTable
const options = {
  theme: 'grid',
  margin: { top: 30, left: leftMargin, right: leftMargin },

  styles: {
    fontSize: 8,
    font:'times',
    textColor: [0, 0, 0],
    cellPadding: 1,
  },
  headStyles: {
    fillColor: null,
    fontSize: 8,
    font:'times',
    lineWidth: 0.1,
    textColor: [0, 0, 0],
    lineColor: [0, 0, 0],
    fontStyle: 'bold',
  },
  bodyStyles: {
    lineColor: [0, 0, 0],
  },
  didParseCell: (data :any) => {
    if (data.cell.raw) {
      data.cell.styles.minCellHeight = 5;
    }
  },

  didDrawPage: (data: any) => {
    if (data.pageNumber === 1) {
      pdf.setFontSize(10);
      lines.forEach((line, index) => {
        pdf.text(line.trim(), leftMargin, 10 + (index * 6));
      });
      data.settings.margin.top = 30;
    } else {
      data.settings.margin.top = 5;
    }

    const footerText = "* The data subject to change within 3 days due to late reception of data and/or it will be adopted from the nearest circle in the case of missing data.";
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(7);
    pdf.text(footerText, leftMargin, data.cursor.y + 4);
  },
  head: [tableHeaders],
  body: tableData,
  startY: 35

};
(pdf as any).autoTable(options);
 pdf.save('report.pdf');
}



}
