import React, { FC, useState, useCallback, memo } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Dustbin } from './Dustbin'
import { Box1 } from './Box'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper'
import {Box, Typography, Tab, Tabs} from "@material-ui/core";
import { Button } from "@material-ui/core";
import styled from "styled-components";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const FushionButton = styled(Button)``;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
}

interface BoxState {
  name: string
  type: string
  img: string
}

export interface DustbinSpec {
  accepts: string[]
  lastDroppedItem: any
}
export interface BoxSpec {
  name: string
  type: string
}
export interface ContainerState {
  droppedBoxNames: string[]
  dustbins: DustbinSpec[]
  boxes: BoxSpec[]
}

export const Container: FC = memo(function Container() {
  const [dustbins, setDustbins] = useState<DustbinState[]>([
    { accepts: [ItemTypes.EGG, 
      ItemTypes.BABY,
      ItemTypes.CHILD,
      ItemTypes.BIG,
    ], lastDroppedItem: null },
    { accepts: [ItemTypes.BABY,
      ItemTypes.CHILD,
      ItemTypes.BIG,], lastDroppedItem: null },
  ])

  const [eggs] = useState<BoxState[]>([
    { name: 'Egg#1', type: ItemTypes.EGG, img:'1.png' },
    { name: 'Egg#2', type: ItemTypes.EGG, img:'2.png' },
    { name: 'Egg#3', type: ItemTypes.EGG, img:'3.png' },
  ])
  const [babys] = useState<BoxState[]>([
    { name: 'Baby#1', type: ItemTypes.BABY, img:'4.png' },
    { name: 'Baby#2', type: ItemTypes.BABY, img:'5.png' },
    { name: 'Baby#3', type: ItemTypes.BABY, img:'6.png' },
  ])
  const [children] = useState<BoxState[]>([
    { name: 'Child#1', type: ItemTypes.CHILD, img:'7.png' },
    { name: 'Child#2', type: ItemTypes.CHILD, img:'8.png' },
    { name: 'Child#3', type: ItemTypes.CHILD, img:'9.png' },
  ])
  const [bigs] = useState<BoxState[]>([
    { name: 'Big one#1', type: ItemTypes.BIG, img:'1.png' },
    { name: 'Big one#2', type: ItemTypes.BIG, img:'2.png' },
    { name: 'Big one#3', type: ItemTypes.BIG, img:'0.png' },
  ])

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string, img: string }) => {
      const { name, img } = item
      if(dustbins.filter((e)=>e.lastDroppedItem==item).length==0) {
        setDroppedBoxNames(
          update(droppedBoxNames, name ? { $push: [name, img] } : { $push: [] }),
        )
        setDustbins(
          update(dustbins, {
            [index]: {
              lastDroppedItem: {
                $set: item,
              },
            },
          }),
        )
      }
    },
    [droppedBoxNames, dustbins],
  )

  const [value, setValue] = React.useState(0);
  
  const onFushion = () => {
    
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setDroppedBoxNames(
      update(droppedBoxNames, { $push: [] }),
    )
    setDustbins(
      update(dustbins, {
        [0]: {
          lastDroppedItem: {
            $set: null,
          },
        },
        [1]: {
          lastDroppedItem: {
            $set: null,
          },
        },
      }),
    )
	
  };

	const changeTab = () => {
		console.log("this ")
	}

  return (
    <div style={{textAlign:'center'}}>
      <div style={{ overflow: 'hidden', clear: 'both', display:'flex', alignSelf:'center', justifyContent:'center', marginTop:"40px", marginBottom:"20px" }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
            cancelFusion={() => {
              setDustbins(
              update(dustbins, {
                [index]: {
                  lastDroppedItem: {
                    $set: null,
                  },
                },
              }),
            )
          }}
          />
        ))}
        <FushionButton
        onClick={onFushion}
        style={{marginRight:'20px', color:'black', backgroundColor:'white', alignSelf:'center'}}
        > Fusion
        </FushionButton>
        <Dustbin
        accept={[]}
        lastDroppedItem={null}
        onDrop={(item) => {}}
        key={3}
        cancelFusion={() => {}}
        />
      </div>


	<Box sx={{ width: '100%', textAlign:'center' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex',
    justifyContent: 'center'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Eggs" {...a11yProps(0)} />
          <Tab label="Baby Dragon" {...a11yProps(1)} />
          <Tab label="Child Dragon" {...a11yProps(2)} />
		      <Tab label="Big Dragon" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {eggs.map(({ name, type, img }, index) => (
              <Box1
              name={name}
              img={img}
              type={type}
              isDropped={isDropped(name)}
              key={index}
              />
          ))}
		  </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          {babys.map(({ name, type, img }, index) => (
              <Box1
              name={name}
              img={img}
              type={type}
              isDropped={isDropped(name)}
              key={index}
              />
          ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
          {children.map(({ name, type, img }, index) => (
              <Box1
              name={name}
              img={img}
              type={type}
              isDropped={isDropped(name)}
              key={index}
              />
          ))}
      </TabPanel>
	  <TabPanel value={value} index={3}>
          {bigs.map(({ name, type, img }, index) => (
              <Box1
              name={name}
              img={img}
              type={type}
              isDropped={isDropped(name)}
              key={index}
              />
          ))}
      </TabPanel>
  
		</Box>
    </div>

  )
})
