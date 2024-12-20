export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', 
        menus: [      
            { name: 'menu.admin.crud', link: '/system/user-manage' }, 
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            {name: 'menu.admin.manage-doctor', link: '/system/user-doctor'},
           // {name: 'menu.admin.manage-admin', link: '/system/user-admin'},
         
       
            //quản lý hệ thống khám bệnh
                { name: 'menu.doctor.manage-schedule', link: '/doctor/manage' },       
             
    
        ]
    },



  

    {
        name:'menu.admin.clinic',
        menus:[
            {name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'},
        ]
    },

    {
        name:'menu.admin.specialty',
        menus:[
            {name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'},
        ]
    },


    {
        name:'menu.admin.handbook',
        menus:[
            {name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'},
        ]
    },
];

export const doctorMenu = [
    {
        name:'menu.admin.manage-user',
        menus:[                      
         { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' }, 
         { name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' }, 
            ]
    }
   
   
];