﻿using System.Web;
using System.Web.Mvc;

namespace Cookie_Clicker
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
