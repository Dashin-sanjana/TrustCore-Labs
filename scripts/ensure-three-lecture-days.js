const fs = require("fs");

const [sourcePath, outputPath] = process.argv.slice(2);

if (!sourcePath || !outputPath) {
  throw new Error("Usage: node ensure-three-lecture-days.js <source> <output>");
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function tableName(table) {
  return table.match(/<span class="name">([^<]+)<\/span>/)?.[1];
}

function replaceTokens(row, replacements) {
  const tokenPattern = /<td(?: [^>]*)?>[\s\S]*?<\/td>|<!--\s*span\s*-->/g;
  const tokens = [...row.matchAll(tokenPattern)];

  if (tokens.length < days.length) {
    throw new Error(`Expected six day cells in row:\n${row}`);
  }

  let updated = row;
  for (const [index, replacement] of replacements.sort((a, b) => b[0] - a[0])) {
    const token = tokens[index];
    updated = updated.slice(0, token.index) + replacement + updated.slice(token.index + token[0].length);
  }
  return updated;
}

function moveTwoHourBlock(table, startTime, endTime, moduleCode, sourceDay, targetDay) {
  const sourceIndex = days.indexOf(sourceDay);
  const targetIndex = days.indexOf(targetDay);
  const rowsPattern = new RegExp(
    `<tr>\\s*<th class="yAxis">${startTime}<\\/th>[\\s\\S]*?<\\/tr>\\s*` +
      `<tr>\\s*<th class="yAxis">${endTime}<\\/th>[\\s\\S]*?<\\/tr>`
  );
  const rowsMatch = table.match(rowsPattern);

  if (!rowsMatch || !rowsMatch[0].includes(moduleCode)) {
    throw new Error(`Could not find ${moduleCode} at ${startTime} in ${tableName(table)}`);
  }

  const rowMatches = [...rowsMatch[0].matchAll(/<tr>[\s\S]*?<\/tr>/g)];
  const firstRow = rowMatches[0][0];
  const secondRow = rowMatches[1][0];
  const firstTokens = [...firstRow.matchAll(/<td(?: [^>]*)?>[\s\S]*?<\/td>|<!--\s*span\s*-->/g)];
  const secondTokens = [...secondRow.matchAll(/<td(?: [^>]*)?>[\s\S]*?<\/td>|<!--\s*span\s*-->/g)];

  const eventCell = firstTokens[sourceIndex][0];
  if (!eventCell.includes(moduleCode)) {
    throw new Error(`${moduleCode} is not on ${sourceDay} in ${tableName(table)}`);
  }
  if (!/^<td>---<\/td>$/.test(firstTokens[targetIndex][0])) {
    throw new Error(`${targetDay} ${startTime} is occupied in ${tableName(table)}`);
  }
  if (!/span/.test(secondTokens[sourceIndex][0]) || !/^<td>---<\/td>$/.test(secondTokens[targetIndex][0])) {
    throw new Error(`Continuation cells are not movable in ${tableName(table)}`);
  }

  const movedFirstRow = replaceTokens(firstRow, [
    [sourceIndex, "<td>---</td>"],
    [targetIndex, eventCell],
  ]);
  const movedSecondRow = replaceTokens(secondRow, [
    [sourceIndex, "<td>---</td>"],
    [targetIndex, "<!-- span -->"],
  ]);

  return table.replace(rowsMatch[0], rowsMatch[0].replace(firstRow, movedFirstRow).replace(secondRow, movedSecondRow));
}

let html = fs.readFileSync(sourcePath, "utf8");
let changedTables = 0;

html = html.replace(/<table id="[^"]+"[^>]*>[\s\S]*?<\/table>/g, (table) => {
  const name = tableName(table);
  let updated = table;

  if (/^L6 SE \/ G[5-8]$/.test(name)) {
    updated = moveTwoHourBlock(updated, "10:30", "11:30", "6SENG005C", "Wednesday", "Friday");
  } else if (/^L6 CS \/ G[1-6]$/.test(name)) {
    updated = moveTwoHourBlock(updated, "13:30", "14:30", "6COSC023C", "Tuesday", "Thursday");
  } else if (/^L6 CS \/ G[78]$/.test(name)) {
    updated = moveTwoHourBlock(updated, "08:30", "09:30", "6COSC023C", "Wednesday", "Thursday");
  }

  if (updated !== table) changedTables += 1;
  return updated;
});

if (changedTables !== 12) {
  throw new Error(`Expected to update 12 timetables, updated ${changedTables}`);
}

fs.writeFileSync(outputPath, html);
console.log(`Updated ${changedTables} timetables: ${outputPath}`);
