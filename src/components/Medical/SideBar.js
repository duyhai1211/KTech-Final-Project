import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import { rgbToHex } from '@mui/material';


const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);
    const [hasImage, setHasImage] = useState(false);
    return (
        <>
            <div style={{ display: 'flex', height: '100%' }}>
                <Sidebar
                    collapsed={collapsed}
                    toggled={toggled}
                    onBackdropClick={() => setToggled(false)}
                    onBreakPoint={setBroken}
                    image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        
                    breakPoint="md"
                   // (hasImage ? 0.9 : 1)
                    //backgroundColor={{white}}
                //rootStyles={{ color: white }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* <SidebarHeader style={{ marginBottom: '24px', marginTop: '16px' }} /> */}
                        <div style={{ flex: 1, marginBottom: '32px' }}>
                            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
                            </div>
                            {/* menuItemStyles={menuItemStyles} */}
                            <Menu >
                                <SubMenu
                                    label="Charts"

                                // suffix={
                                //     <Badge variant="danger" shape="circle">
                                //         6
                                //     </Badge>
                                // }
                                >
                                    <MenuItem> Pie charts</MenuItem>
                                    <MenuItem> Line charts</MenuItem>
                                    <MenuItem> Bar charts</MenuItem>
                                </SubMenu>
                                <SubMenu label="Maps" >
                                    <MenuItem> Google maps</MenuItem>
                                    <MenuItem> Open street maps</MenuItem>
                                </SubMenu>
                                {/* icon={<Diamond />} */}
                                <SubMenu label="Components" >
                                    <MenuItem> Grid</MenuItem>
                                    <MenuItem> Layout</MenuItem>
                                    <SubMenu label="Forms">
                                        <MenuItem> Input</MenuItem>
                                        <MenuItem> Select</MenuItem>
                                        <SubMenu label="More">
                                            <MenuItem> CheckBox</MenuItem>
                                            <MenuItem> Radio</MenuItem>
                                        </SubMenu>
                                    </SubMenu>
                                </SubMenu>
                                <SubMenu label="E-commerce" >
                                    <MenuItem> Product</MenuItem>
                                    <MenuItem> Orders</MenuItem>
                                    <MenuItem> Credit card</MenuItem>
                                </SubMenu>
                            </Menu>

                            <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                                {/* <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
                                >
                                    Extra
                                </Typography> */}
                            </div>

                            <Menu >
                                {/* icon={<Calendar />} suffix={<Badge variant="success">New</Badge>} */}
                                <MenuItem >
                                    Calendar
                                </MenuItem>
                                <MenuItem >Documentation</MenuItem>
                                <MenuItem disabled>
                                    Examples
                                </MenuItem>
                            </Menu>
                        </div>
                        {/* <SidebarFooter collapsed={collapsed} /> */}
                    </div>
                </Sidebar>
            </div>
        </>
    )
}
export default SideBar