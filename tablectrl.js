function addtable(id)
  {
    var tbl = document.getElementById(id),
        grandparent = tbl.id.replace('td-', '');
        if(tbl.id.indexOf("td-") == 0)
          {
            document.getElementById(id).innerHTML = '<table id="tctrl-'+grandparent+'"></table';
            document.getElementById(id).onclick = donothing;
            addrow('tctrl-'+grandparent);
            addcolumn('tctrl-'+grandparent);
          }
        else
          {
            document.getElementById(id).innerHTML = '<table id="tctrl-"></table';
            addrow('tctrl-');
            addcolumn('tctrl-');
          }
  }

function filtertctrl(str)
  {
    return str+'tctrl-'.replace('tctrl-', '');
  }

function donothing()
  {
    
  }

function createCell(cell, text, style)
  {
    cell.innerHTML = text;
    cell.id = text;
    cell.onclick = insertInInput;
  }

function insertInInput()
  {
    document.getElementById('atable').value = this.id;
    document.getElementById('arow').value = this.parentNode.parentNode.parentNode.id;
    document.getElementById('acolumn').value = this.parentNode.parentNode.parentNode.id;
  }

function addrow(id)
  {
    var tbl = document.getElementById(id),
        row = tbl.insertRow(tbl.rows.length),
        grandparent = '',
        i, tdtbl;
        if(tbl.parentNode.id.indexOf("td-") == 0)
          {
            grandparent = tbl.parentNode.id.replace('td-', '')+'-';
          }
    for (i = 0; i < tbl.rows[0].cells.length; i++)
      {
        tdtbl = tbl.rows.length-1;
        createCell(row.insertCell(i), 'td-'+grandparent+i+'-'+tdtbl, 'row');
      }
  }

function addcolumn(id)
  {
    var tbl = document.getElementById(id),
        grandparent = '',
        i, tdtbl;
        
        if(tbl.parentNode.id.indexOf("td-") == 0)
          {
            grandparent = tbl.parentNode.id.replace('td-', '')+'-';
          }
    for (i = 0; i < tbl.rows.length; i++)
      {
        tdtbl = tbl.rows[i].cells.length;
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), 'td-'+grandparent+tdtbl+'-'+i, 'col');
      }
  }

function getinfo(id)
  {
    var ele = document.getElementById(id);
    alert("Name: "+ele.nodeName+"\nTop: "+ele.offsetTop+"\nLeft: "+ele.offsetLeft+"\nHeight: "+ele.offsetHeight+"\nWidth: "+ele.offsetWidth+"\n");
  }

function buildtablefromcsv(csvid, seperator)
  {
    var lines, cells, csv, i, j, returnstring, settable, tablename;
    var tableid = '';
    csv = document.getElementById(csvid).innerHTML;
    lines = csv.split("\n");
    returnstring = '0';
    for (i = 0; i < lines.length; i++)
      {
        if(lines[i] == '')
          {
            returnstring = '';
          }
        else
          {
            cells = lines[i].split(seperator);
            if(cells[0] == 'tablectrl')
              {
                tablename = cells[2];
                if(cells[2] == undefined)
                  {
                    tablename = cells[1].split("td-");
                    tablename = "tctrl-"+tablename[1];
                  }
                returnstring = '<table id="'+tablename+'">'+"\n"+returnstring+'</table>'+"\n";
                document.getElementById(cells[1]).innerHTML = returnstring;
                
              }
            else
              {
                returnstring += '<tr>';
                for (j = 0; j < cells.length; j++)
                  {
                    returnstring += '<td id="'+cells[j]+'">'+cells[j]+'</td>';
                  }
                returnstring += '</tr>'+"\n";
              }
          }
      }
  }
/*
function buildtablefromcsv(csvid, seperator)
  {
    var lines, cells, csv, i, j, returnstring, settable;
    var tableid = '';
    csv = document.getElementById(csvid).innerHTML;
    lines = csv.split("\n");
    returnstring = '<table id="tctrl-">';
    for (i = 0; i < lines.length; i++)
      {
        if(tableid != '')
          {
            //alert(tableid);
            //alert(returnstring);
            //returnstring += '</table>';
            document.getElementById(tableid).innerHTML += returnstring;
            document.getElementById('tablearea').value += returnstring;
            //document.getElementById(tableid).innerHTML = document.getElementById(tableid).innerHTML+" "+returnstring;
            returnstring = '';
          }
        
        cells = lines[i].split(seperator);
        //alert(cells.length+" <--");
        if(((cells.length == 1)&&cells[0] == '')||(settable == 1))
          {
            //alert(cells.length+" "+settable);
            settable = 1;
            tableid = '';
            
            
            //tableid = cells
            if(cells[0] != '')
              {
                tableid = cells[0];
                //alert(tableid);
                //returnstring += '</table>';
                settable = 0;
                returnstring += '<table>';
              }
            else
              {
                returnstring += '</table>';
              }
          }
        else
          {
            returnstring += '<tr>';
            for (j = 0; j < cells.length; j++)
              {
                returnstring += '<td id="'+cells[j]+'">'+cells[j]+'</td>';
              }
            returnstring += '</tr>';
          }
        //alert(i+": "+returnstring+"\n");
      }
    //returnstring += '</table>';
    
  }
  */
