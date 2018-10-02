using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ProdClass producteurs = ProdSerializer.ProdDs();
            ViewBag.producteur = producteurs;
            BoostClass boosts = BoostSerializer.BoostDs();
            ViewBag.clickBoost = boosts.Boosts.ClickBoosts;
            ViewBag.prodBoost = boosts.Boosts.CookieBoosts;
            ViewBag.cursorBoost = boosts.Boosts.CursorBoosts;
            ViewBag.grandmaBoost = boosts.Boosts.GrandMaBoosts;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult News()
        {
            string[] citations = new string[]
            {
                "To be or not to be",
                "Test1",
                "Test2"
            };


            return Json(citations, JsonRequestBehavior.AllowGet);
        }
    }
}