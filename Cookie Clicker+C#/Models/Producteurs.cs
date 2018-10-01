using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;


namespace WebApplication1.Models
{   [Serializable()]
    public class Prod
    {
        [XmlElement("name")]
        public string Name { get; set; }

        [XmlElement("cps")]
        public double Cps { get; set; }

        [XmlElement("price")]
        public int Price { get; set; }

        public int Nb { get; set; }

        
    }

    [Serializable()]
    [XmlRoot("ProdClass")]
    public class ProdClass
    {
        [XmlArray("Producteurs")]
        [XmlArrayItem("Prod", typeof(Prod))]
        public Prod[] Prod { get; set; }
    }

    public class ProdSerializer
    {
        public static ProdClass ProdDs()
        {
            ProdClass producteurs = null;
            string path = @"C:\Users\Alexandre\source\repos\Cookie Clicker\Cookie Clicker+C#\App_Data/XMLproducteurs.xml";

            XmlSerializer serializer = new XmlSerializer(typeof(ProdClass));
            StreamReader reader = new StreamReader(path);
            producteurs = (ProdClass)serializer.Deserialize(reader);
            reader.Close();
            return producteurs;
        }
    }
}

/*
// NOTE: Generated code may require at least .NET Framework 4.5 or .NET Core/Standard 2.0.
/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
[System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
public partial class producteurs
{

    private producteursProd[] prodField;

    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute("prod")]
    public producteursProd[] prod
    {
        get
        {
            return this.prodField;
        }
        set
        {
            this.prodField = value;
        }
    }
}

/// <remarks/>
[System.SerializableAttribute()]
[System.ComponentModel.DesignerCategoryAttribute("code")]
[System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
public partial class producteursProd
{

    private string nameField;

    private double cpsField;

    private int priceField;

    /// <remarks/>
    public string name
    {
        get
        {
            return this.nameField;
        }
        set
        {
            this.nameField = value;
        }
    }

    /// <remarks/>
    public double cps
    {
        get
        {
            return this.cpsField;
        }
        set
        {
            this.cpsField = value;
        }
    }

    /// <remarks/>
    public int price
    {
        get
        {
            return this.priceField;
        }
        set
        {
            this.priceField = value;
        }
    }
}
*/
