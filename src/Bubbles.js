import React from 'react'
import { Avatar, Flex, Box, Container } from 'rebass'
import { shuffle, random, sample, take } from 'lodash'
import { mx } from './theme'

const ids = [
  'T0266FRGM-U0266FRGP-bfe9aa82f6b1',
  'T0266FRGM-U3XP4M6AZ-ge5279a5d1f3',
  'T0266FRGM-U3SLX4213-8b7da8568d4a',
  'T0266FRGM-U0C7B14Q3-181d8bae46ac',
  'T0266FRGM-U384YTXBR-0c30854b857e',
  'T0266FRGM-U2ZJX2AF4-d880e11ad5b2',
  'T0266FRGM-U39DWA80Z-546bccf7d5c8',
  'T0266FRGM-U0C7BTKLG-495da59309d6',
  'T0266FRGM-U2FJ82L22-bf6db1c487c3',
  'T0266FRGM-U3X783S30-8d8b45025871',
  'T0266FRGM-U3XRNJG5Q-2a6945374437',
  'T0266FRGM-U0F68NNJ0-faad93c7a61b',
  'T0266FRGM-U0F7WSLDV-g9358d60c3ac',
  'T0266FRGM-U0F8G21GB-g48efd379276',
  'T0266FRGM-U0FD81FK3-6226840d5358',
  'T0266FRGM-U0FHF31PX-930a141a812b',
  'T0266FRGM-U0FKVTS1X-ce682dc3af05',
  'T0266FRGM-U0FKZJ3PD-g16d47e64677',
  'T0266FRGM-U0FNAN9KR-g7beb71cbe64',
  'T0266FRGM-U0FSU1TME-d930802270d8',
  'T0266FRGM-U0G1CAY0K-b0ab9ae8d059',
  'T0266FRGM-U0G49R5U6-g32c638e7a3a',
  'T0266FRGM-U0GJCLY9X-g540e30440d9',
  'T0266FRGM-U0GNQCLCF-gcbe8ea3454d',
  'T0266FRGM-U0GQ46SR2-96c41cd7f9cd',
  'T0266FRGM-U0GQRMHSL-987eebe964c4',
  'T0266FRGM-U0GR86D5K-179214571e5f',
  'T0266FRGM-U0GRUQK3K-gecd270fa99c',
  'T0266FRGM-U0H076SCX-7eb83f3e1a22',
  'T0266FRGM-U0H0UTL0H-gb32e92725ed',
  'T0266FRGM-U0H16B51S-gfdf1da9490f',
  'T0266FRGM-U0H18NFR9-gb9295ad63fb',
  'T0266FRGM-U0H1C2YTB-ga96107917a1',
  'T0266FRGM-U0H1D2UQG-g5c2acd88c26',
  'T0266FRGM-U0H1Q1E3X-g89e5f7614cb',
  'T0266FRGM-U0C7HD8V7-g426bf13b33b',
  'T0266FRGM-U0C7HFFFC-a112fd164529',
  'T0266FRGM-U0C7MDVL2-59dd2ebf1457',
  'T0266FRGM-U0C82C0N7-1ff45018a958',
  'T0266FRGM-U0C83RPB9-bd9696051994',
  'T0266FRGM-U0C849MEG-3ebc363144ed',
  'T0266FRGM-U0C8758HX-gcecdfc19bd6',
  'T0266FRGM-U0C8JSG5R-gbc377d435e3',
  'T0266FRGM-U0C8M7BT8-gf81334869a6',
  'T0266FRGM-U0C8X2S49-c61bf4f0e7da',
  'T0266FRGM-U0C9ZAZ4P-764e52aa56de',
  'T0266FRGM-U0CAKG0DN-238f44be0a66',
  'T0266FRGM-U0CD9GJVB-g233d0071ac7',
  'T0266FRGM-U0CDHUY90-0555bf641a3b',
  'T0266FRGM-U0CDZ3DRD-gb9f709fc465',
  'T0266FRGM-U0CGYCHB7-10149f60ee30',
  'T0266FRGM-U0CH6U56F-ge421d12efb8',
  'T0266FRGM-U0CJ2N278-g4842ff09b95',
  'T0266FRGM-U0CJ3HBML-9b78493c948d',
  'T0266FRGM-U0CV9QK42-g22f71b19a9c',
  'T0266FRGM-U0D7LJBEK-g1184d44c304',
  'T0266FRGM-U0D7YGZJP-gf1f8206e3cf',
  'T0266FRGM-U0D9ZFQ2J-6e1f3044ac85',
  'T0266FRGM-U0DA0T2BZ-gd657f62d6b2',
  'T0266FRGM-U0DAP3DU0-c17ae0099a1e',
  'T0266FRGM-U0DBBFC8Y-g85b50a92521',
  'T0266FRGM-U0DBRV1A6-9b41cdfa56ce',
  'T0266FRGM-U0DCPB7AP-509c8e7b178e',
  'T0266FRGM-U0DMXNBJS-7febc1ebeb59',
  'T0266FRGM-U0DNATNVD-gea7230878b6',
  'T0266FRGM-U0DPFU6JY-4cf5fd46687f',
  'T0266FRGM-U0DPHLQBT-631c5d483ccf',
  'T0266FRGM-U0DPMSV0E-3d42f3cc23b7',
  'T0266FRGM-U0DQ7TA20-acb5cce61ac3',
  'T0266FRGM-U0DRPEQET-eb8717207363',
  'T0266FRGM-U0DSJQR6H-g8a3aa0f46c5',
  'T0266FRGM-U0DSQP9E1-gaef844f2452',
  'T0266FRGM-U0DSXRHD1-g74276fbbf61',
  'T0266FRGM-U0DSZ7L9M-gc4dbaf14003',
  'T0266FRGM-U0DT0TSHL-gb181856d409',
  'T0266FRGM-U0DT1AZ7C-g13fedda66ba',
  'T0266FRGM-U0E0ASCJW-9eb79339c55c',
  'T0266FRGM-U0E1Z23T9-g383dd044e72',
  'T0266FRGM-U0E37G7DH-9468fccc0987',
  'T0266FRGM-U0E3884TG-g80def868ebb',
  'T0266FRGM-U0E3HHZJ6-g4d20c3a0bf1',
  'T0266FRGM-U0E6V3ELX-ga4793bb1279',
  'T0266FRGM-U0ED28QLW-gb8979523edd',
  'T0266FRGM-U0EDEANUD-g796282a130b',
  'T0266FRGM-U0EFXGE2X-g36cc2d12e2e',
  'T0266FRGM-U0EG0GLK1-gbbc6d71c756',
  'T0266FRGM-U0EH8Q0CU-g7f198128cab',
  'T0266FRGM-U0EHEHLNB-g9f3bce03dfc',
  'T0266FRGM-U0ELRLEE9-c284fd4b159a',
  'T0266FRGM-U0EM29YFR-3fa9e939d239',
  'T0266FRGM-U0EP06TGC-ge8524d4e246',
  'T0266FRGM-U0ER5Q3B5-d49c56790604',
  'T0266FRGM-U0ER6CPAQ-f6761d21cef6',
  'T0266FRGM-U0ERUJZFT-774194bf1726',
  'T0266FRGM-U0ESH6E79-5197b8874454',
  'T0266FRGM-U0EUHGEGZ-a1f9002796bb',
  'T0266FRGM-U0F1M2536-dd7491e2b701',
  'T0266FRGM-U0F26UE81-32c5037b2b98',
  'T0266FRGM-U0F560RDY-gfe9fff49b65'
]

const Root = Flex.extend.attrs({
  justify: 'center',
  align: 'center',
  px: 3
})`
  position: relative;
  max-width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`

const Fill = Flex.extend.attrs({ justify: 'center', wrap: true })`
  position: absolute;
  top: 0;
  z-index: -1;
`

const Cloud = Box.extend.attrs({ px: 3, pt: 3, mx: 'auto' })`
  max-width: 32rem;
  border-radius: 4rem;
  box-shadow: 0 0 2rem 2rem rgba(250, 250, 250, 0.95);
  background-color: rgba(250, 250, 250, 0.95);
  text-align: center;
  z-index: 2;

  ${mx[1]} {
    max-width: 48rem;
    border-radius: 8rem;
    box-shadow: 0 0 8rem 8rem rgba(250, 250, 250, 0.95);
  }
`

const Bubble = Avatar.extend`
  margin: 0.5em;

  &:nth-child(odd) {
    margin-left: 1.5em;
    margin-top: 0;
  }
  &:nth-child(even) {
    margin-right: 1em;
  }
  &:nth-child(6n) {
    width: 3em;
    height: 3em;
    margin-bottom: 1em;
  }
  &:nth-child(8n) {
    width: 2.5em;
    height: 2.5em;
    margin-left: 1em;
  }
  &:nth-child(13n) {
    width: 1.5em;
    height: 1.5em;
  }

  /* fill gap left by diagonal cutoff */
  ${mx[1]} {
    &:first-child {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 0;
      top: -4rem;
    }
    &:nth-child(2) {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 9rem;
      top: -3rem;
    }
    &:nth-child(3) {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 18rem;
      top: -3rem;
    }
  }
`

const Bubbles = ({ children }) => (
  <Root>
    <Fill>
      {shuffle([...ids, ...ids]).map(id => (
        <Bubble
          src={`https://ca.slack-edge.com/${id}-128`}
          size={sample([28, 32, 48, 56, 64, 72])}
          key={`a-${id}`}
        />
      ))}
    </Fill>
    <Cloud children={children} />
  </Root>
)

export default Bubbles
