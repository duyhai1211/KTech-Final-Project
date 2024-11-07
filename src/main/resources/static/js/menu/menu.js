// Fetch API for menu-related actions
const baseUrl = '/menu';
const token = localStorage.getItem('jwtToken');

// Create Menu
async function createMenu(menuData) {
    try {
        const response = await fetch(`${baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(menuData)
        });
        if (!response.ok) {
            console.error('Failed to create menu:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Menu created:', data);
        return data;
    } catch (error) {
        console.error('Error creating menu:', error);
    }
}

// Get All Menus (Paginated)
async function getMenus(page = 0, size = 10) {
    try {
        const response = await fetch(`${baseUrl}?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Failed to fetch menus:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Fetched menus:', data);
        return data;
    } catch (error) {
        console.error('Error fetching menus:', error);
    }
}

// Get One Menu by ID
async function getMenuById(menuId) {
    try {
        const response = await fetch(`${baseUrl}/${menuId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Failed to fetch menu:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Fetched menu:', data);
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

// Update Menu
async function updateMenu(menuId, menuData) {
    try {
        const response = await fetch(`${baseUrl}/${menuId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(menuData)
        });
        if (!response.ok) {
            console.error('Failed to update menu:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Menu updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating menu:', error);
    }
}

// Update Menu Image
async function updateMenuImg(menuId, file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${baseUrl}/${menuId}/updateImg`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (!response.ok) {
            console.error('Failed to update menu image:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Menu image updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating menu image:', error);
    }
}

// Delete Menu
async function deleteMenu(menuId) {
    try {
        const response = await fetch(`${baseUrl}/${menuId}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Failed to delete menu:', response.statusText);
            return;
        }
        console.log('Menu deleted successfully');
    } catch (error) {
        console.error('Error deleting menu:', error);
    }
}
