function reload_table() {
  fetch(
      'https://raw.githubusercontent.com/humanranker/i_rank_humans_database/master/db.json')
      .then(res => res.json())
      .then((data) => {
        var table = document.createElement("table");
        table.setAttribute("class", "u-full-width");
        document.getElementById("place_for_table").innerHTML = "";
        document.getElementById("place_for_table").appendChild(table);

        var cols = [ "Name", "Goods", "Bads" ];
        var tr = table.createTHead().insertRow(0);
        for (var i = 0; i < cols.length; i++) {
          var th = document.createElement("th");
          th.innerHTML = cols[i];
          tr.appendChild(th);
        }

        var sdata = [];
        for (var name in data) {
          sdata.push([ name, data[name][0], data[name][1] ]);
        }

        var sorttype = document.getElementById("sorting").value;

        sorter = 0;
        switch (sorttype) {
        case "0":
          sorter = 0;
          break;
        case "1":
          sorter = 1;
          break;
        case "2":
          sorter = 2;
          break;
        default:
          sorter = 0;
        }
        sdata.sort(function(a, b) {
          if (typeof a[sorter] === "string") {
            return a[sorter].localeCompare(b[sorter]);
          } else {
            return b[sorter] - a[sorter];
          }
        });

        var tb = table.createTBody();
        for (var entry in sdata) {
          var tr = tb.insertRow(-1);

          var nameCell = tr.insertCell(-1);
          var goodCell = tr.insertCell(-1);
          var badCell = tr.insertCell(-1);

          nameCell.innerHTML = sdata[entry][0];
          goodCell.innerHTML = sdata[entry][1];
          badCell.innerHTML = sdata[entry][2];
        }
      })
      .catch(err => console.error(err));
}

reload_table();
