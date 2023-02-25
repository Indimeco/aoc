export const binToHex = (hex: string, pad: number = 4) =>
  parseInt(hex, 16).toString(2).padStart(pad, "0");

const binToDec = (bin: string) => parseInt(bin, 2);

type BITSTransmissionParts = [string, string, string];
export const getBITSTransmissionParts = (
  binary: string
): BITSTransmissionParts => [
  binary.substring(0, 3),
  binary.substring(3, 6),
  binary.substring(6),
];

export const getBITSVersion = ([version]: BITSTransmissionParts) =>
  binToDec(version);

export const getBITSType = ([version, type]: BITSTransmissionParts) =>
  binToDec(type);

type BITSTransmission = { version: number; type: number; body: string };
export const getBitsTransmission = ([
  version,
  type,
  body,
]: BITSTransmissionParts): BITSTransmission => {
  return {
    version: binToDec(version),
    type: binToDec(type),
    body,
  };
};

const getLinearBody = (rawBody: string): string => {
  const groups = rawBody.match(/.{1,5}/g);
  const { body } = groups?.reduce((acc, cur) => {
    if (acc.done) return acc;
    if (cur[0] === "0") {
      return { body: [...acc, ...cur], done: true };
    }
    return { body: [...acc, ...cur], done: false };
  });
  return body;
};

const getPacketLength = (type: number, rawBody: string): number => {
  if (type === 4) {
    return getLinearBody(rawBody).length;
  }

  const [lengthId, ...restBody] = rawBody;
  if (lengthId === "0") {
    const lengthOfPackets = binToDec(restBody.join("").substring(0, 15));
    return lengthOfPackets;
  }
  if (lengthId === "1") {
    const numberOfPackets = binToDec(restBody.join("").substring(0, 11));
    Array.from(Array(numberOfPackets)).reduce((acc) => {
      const current = acc[acc.length - 1];
    });
  }
  throw new Error("Unhandled packet type");
};

const getSubPackets = (
  transmission: BITSTransmission,
  subPackets: BITSTransmission[] = []
): BITSTransmission[] => {
  if (transmission.type === 4) {
    return [...subPackets, transmission];
  }
  // packet is made of subpackets
  const packetLength = getPacketLength(transmission.type, transmission.body);

  throw new Error(`Unhandled trasmission type: ${transmission.type}`);
};
