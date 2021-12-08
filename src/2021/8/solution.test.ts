import { input } from "./input";
import { solution, solution2, signalToNumber, parseDigit } from "./solution";

test("should work", () => {
  expect(signalToNumber("dab")).toEqual(7);
  expect(signalToNumber("eafb")).toEqual(4);
  expect(signalToNumber("gc")).toEqual(1);

  expect(
    solution([
      {
        signal: [
          "be",
          "cfbegad",
          "cbdgef",
          "fgaecd",
          "cgeb",
          "fdcge",
          "agebfd",
          "fecdb",
          "fabcd",
          "edb",
        ],
        digits: ["fdgacbe", "cefdb", "cefbgd", "gcbe"],
      },
      {
        signal: [
          "edbfga",
          "begcd",
          "cbg",
          "gc",
          "gcadebf",
          "fbgde",
          "acbgfd",
          "abcde",
          "gfcbed",
          "gfec",
        ],
        digits: ["fcgedb", "cgb", "dgebacf", "gc"],
      },
      {
        signal: [
          "fgaebd",
          "cg",
          "bdaec",
          "gdafb",
          "agbcfd",
          "gdcbef",
          "bgcad",
          "gfac",
          "gcb",
          "cdgabef",
        ],
        digits: ["cg", "cg", "fdcagb", "cbg"],
      },
      {
        signal: [
          "fbegcd",
          "cbd",
          "adcefb",
          "dageb",
          "afcb",
          "bc",
          "aefdc",
          "ecdab",
          "fgdeca",
          "fcdbega",
        ],
        digits: ["efabcd", "cedba", "gadfec", "cb"],
      },
      {
        signal: [
          "aecbfdg",
          "fbg",
          "gf",
          "bafeg",
          "dbefa",
          "fcge",
          "gcbea",
          "fcaegb",
          "dgceab",
          "fcbdga",
        ],
        digits: ["gecf", "egdcabf", "bgf", "bfgea"],
      },
      {
        signal: [
          "fgeab",
          "ca",
          "afcebg",
          "bdacfeg",
          "cfaedg",
          "gcfdb",
          "baec",
          "bfadeg",
          "bafgc",
          "acf",
        ],
        digits: ["gebdcfa", "ecba", "ca", "fadegcb"],
      },
      {
        signal: [
          "dbcfg",
          "fgd",
          "bdegcaf",
          "fgec",
          "aegbdf",
          "ecdfab",
          "fbedc",
          "dacgb",
          "gdcebf",
          "gf",
        ],
        digits: ["cefg", "dcbef", "fcge", "gbcadfe"],
      },
      {
        signal: [
          "bdfegc",
          "cbegaf",
          "gecbf",
          "dfcage",
          "bdacg",
          "ed",
          "bedf",
          "ced",
          "adcbefg",
          "gebcd",
        ],
        digits: ["ed", "bcgafe", "cdgba", "cbgef"],
      },
      {
        signal: [
          "egadfb",
          "cdbfeg",
          "cegd",
          "fecab",
          "cgb",
          "gbdefca",
          "cg",
          "fgcdab",
          "egfdb",
          "bfceg",
        ],
        digits: ["gbdfcae", "bgc", "cg", "cgb"],
      },
      {
        signal: [
          "gcafb",
          "gcf",
          "dcaebfg",
          "ecagb",
          "gf",
          "abcdeg",
          "gaef",
          "cafbge",
          "fdbac",
          "fegbdc",
        ],
        digits: ["fgae", "cfgab", "fg", "bagce"],
      },
    ])
  ).toEqual(26);

  expect(solution(input)).toEqual(440);
});

test("part 2 should work", () => {
  expect(
    parseDigit({
      signal: [
        "acedgfb",
        "cdfbe",
        "gcdfa",
        "fbcad",
        "dab",
        "cefabd",
        "cdfgeb",
        "eafb",
        "cagedb",
        "ab",
      ],
      digits: ["cdfeb", "fcadb", "cdfeb", "cdbaf"],
    })
  ).toEqual(5353);

  expect(
    parseDigit({
      signal: [
        "edbfga",
        "begcd",
        "cbg",
        "gc",
        "gcadebf",
        "fbgde",
        "acbgfd",
        "abcde",
        "gfcbed",
        "gfec",
      ],
      digits: ["fcgedb", "cgb", "dgebacf", "gc"],
    })
  ).toEqual(9781);

  expect(
    parseDigit({
      signal: [
        "fgaebd",
        "cg",
        "bdaec",
        "gdafb",
        "agbcfd",
        "gdcbef",
        "bgcad",
        "gfac",
        "gcb",
        "cdgabef",
      ],
      digits: ["cg", "cg", "fdcagb", "cbg"],
    })
  ).toEqual(1197);

  expect(
    parseDigit({
      signal: [
        "edbfga",
        "begcd",
        "cbg",
        "gc",
        "gcadebf",
        "fbgde",
        "acbgfd",
        "abcde",
        "gfcbed",
        "gfec",
      ],
      digits: ["fcgedb", "cgb", "dgebacf", "gc"],
    })
  ).toEqual(9781);

  expect(
    parseDigit({
      signal: [
        "bdfegc",
        "cbegaf",
        "gecbf",
        "dfcage",
        "bdacg",
        "ed",
        "bedf",
        "ced",
        "adcbefg",
        "gebcd",
      ],
      digits: ["ed", "bcgafe", "cdgba", "cbgef"],
    })
  ).toEqual(1625);

  expect(
    parseDigit({
      signal: [
        "aecbfdg",
        "fbg",
        "gf",
        "bafeg",
        "dbefa",
        "fcge",
        "gcbea",
        "fcaegb",
        "dgceab",
        "fcbdga",
      ],
      digits: ["gecf", "egdcabf", "bgf", "bfgea"],
    })
  ).toEqual(4873);

  expect(
    parseDigit({
      signal: [
        "bdfegc",
        "cbegaf",
        "gecbf",
        "dfcage",
        "bdacg",
        "ed",
        "bedf",
        "ced",
        "adcbefg",
        "gebcd",
      ],
      digits: ["ed", "bcgafe", "cdgba", "cbgef"],
    })
  ).toEqual(1625);

  expect(
    solution2([
      {
        signal: [
          "be",
          "cfbegad",
          "cbdgef",
          "fgaecd",
          "cgeb",
          "fdcge",
          "agebfd",
          "fecdb",
          "fabcd",
          "edb",
        ],
        digits: ["fdgacbe", "cefdb", "cefbgd", "gcbe"],
      },
      {
        signal: [
          "edbfga",
          "begcd",
          "cbg",
          "gc",
          "gcadebf",
          "fbgde",
          "acbgfd",
          "abcde",
          "gfcbed",
          "gfec",
        ],
        digits: ["fcgedb", "cgb", "dgebacf", "gc"],
      },
      {
        signal: [
          "fgaebd",
          "cg",
          "bdaec",
          "gdafb",
          "agbcfd",
          "gdcbef",
          "bgcad",
          "gfac",
          "gcb",
          "cdgabef",
        ],
        digits: ["cg", "cg", "fdcagb", "cbg"],
      },
      {
        signal: [
          "fbegcd",
          "cbd",
          "adcefb",
          "dageb",
          "afcb",
          "bc",
          "aefdc",
          "ecdab",
          "fgdeca",
          "fcdbega",
        ],
        digits: ["efabcd", "cedba", "gadfec", "cb"],
      },
      {
        signal: [
          "aecbfdg",
          "fbg",
          "gf",
          "bafeg",
          "dbefa",
          "fcge",
          "gcbea",
          "fcaegb",
          "dgceab",
          "fcbdga",
        ],
        digits: ["gecf", "egdcabf", "bgf", "bfgea"],
      },
      {
        signal: [
          "fgeab",
          "ca",
          "afcebg",
          "bdacfeg",
          "cfaedg",
          "gcfdb",
          "baec",
          "bfadeg",
          "bafgc",
          "acf",
        ],
        digits: ["gebdcfa", "ecba", "ca", "fadegcb"],
      },
      {
        signal: [
          "dbcfg",
          "fgd",
          "bdegcaf",
          "fgec",
          "aegbdf",
          "ecdfab",
          "fbedc",
          "dacgb",
          "gdcebf",
          "gf",
        ],
        digits: ["cefg", "dcbef", "fcge", "gbcadfe"],
      },
      {
        signal: [
          "bdfegc",
          "cbegaf",
          "gecbf",
          "dfcage",
          "bdacg",
          "ed",
          "bedf",
          "ced",
          "adcbefg",
          "gebcd",
        ],
        digits: ["ed", "bcgafe", "cdgba", "cbgef"],
      },
      {
        signal: [
          "egadfb",
          "cdbfeg",
          "cegd",
          "fecab",
          "cgb",
          "gbdefca",
          "cg",
          "fgcdab",
          "egfdb",
          "bfceg",
        ],
        digits: ["gbdfcae", "bgc", "cg", "cgb"],
      },
      {
        signal: [
          "gcafb",
          "gcf",
          "dcaebfg",
          "ecagb",
          "gf",
          "abcdeg",
          "gaef",
          "cafbge",
          "fdbac",
          "fegbdc",
        ],
        digits: ["fgae", "cfgab", "fg", "bagce"],
      },
    ])
  ).toEqual(61229);

  // expect(solution2(input)).toEqual(1046281);
});
