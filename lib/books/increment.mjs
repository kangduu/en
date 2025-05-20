// import path from "path";
// import fs from "fs";

// function increment(filePath, end, fn) {
//   fs.readFile(filePath, "utf-8", function (error, data) {
//     if (error) {
//       console.log("an error occur:", error.message);
//       return;
//     }

//     try {
//       const origin = JSON.parse(data);

//       // push data
//       const last = origin[origin.length - 1];
//       let start = last.id;
//       while (start < end) {
//         start++;
//         const newData = fn(start);
//         origin.push(newData);
//       }

//       fs.writeFile(filePath, JSON.stringify(origin), (error) => {
//         if (error) console.log("an error occur:", error.message);
//         else console.log("file write succeed");
//       });
//     } catch (error) {
//       console.log("an error occur:", error.message);
//     }
//   });
// }

// const one = path.resolve("./one.json");
// increment(one, 72, (id) => {
//   return {
//     id,
//     name: "",
//     course: [],
//     translation: [],
//     notes: [],
//     audio: `/first-things-first/1-0${id * 2 - 1}.mp3`,
//   };
// });

// const two = path.resolve("./two.json");
// increment(two, 72, (id) => {
//   return {
//     id,
//     name: "",
//     course: [],
//     translation: [],
//     notes: [],
//     audio: `/first-things-first/1-0${id * 2 - 1}.mp3`,
//   };
// });

// const three = path.resolve("./three.json");
// increment(three, 72, (id) => {
//   return {
//     id,
//     name: "",
//     course: [],
//     translation: [],
//     notes: [],
//     audio: `/first-things-first/1-0${id * 2 - 1}.mp3`,
//   };
// });
