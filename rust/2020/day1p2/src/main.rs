use std::fs;
fn main() {
    let input = read_input()
        .trim()
        .split('\n')
        .map(|f| f.parse::<u32>().unwrap())
        .collect();
    let result = answer(input);
    println!("{:#?}", result);
}

fn answer(input: Vec<u32>) -> Option<u32> {
    let mut a: u32 = 0;
    input.iter().for_each(|f| {
        input.iter().for_each(|x| {
            input.iter().for_each(|y| {
                if x + f + y == 2020 {
                    a = x * f * y;
                }
            })
        })
    });
    if a != 0 {
        return Some(a);
    };
    None
}

fn read_input() -> String {
    match fs::read_to_string("./input") {
        Ok(a) => a,
        Err(e) => panic!("Failed to parse puzzle input: {e}"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn computes_2020_mult() {
        let input = vec![1721, 979, 366, 299, 675, 1456];
        assert_eq!(answer(input), Some(241861950));
    }
}
