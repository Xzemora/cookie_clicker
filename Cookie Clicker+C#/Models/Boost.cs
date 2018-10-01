using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace WebApplication1.Models
{

    // NOTE: Generated code may require at least .NET Framework 4.5 or .NET Core/Standard 2.0.
    /// <remarks/>
    
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]    
    public partial class BoostClass
    {

        private BoostClassBoosts boostsField;

        /// <remarks/>
        public BoostClassBoosts Boosts
        {
            get
            {
                return this.boostsField;
            }
            set
            {
                this.boostsField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class BoostClassBoosts
    {

        private BoostClassBoostsClickBoost[] clickBoostsField;

        private BoostClassBoostsCookieBoost[] cookieBoostsField;

        private BoostClassBoostsCursorBoost[] cursorBoostsField;

        private BoostClassBoostsGrandMaBoost[] grandMaBoostsField;

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("ClickBoost", IsNullable = false)]
        public BoostClassBoostsClickBoost[] ClickBoosts
        {
            get
            {
                return this.clickBoostsField;
            }
            set
            {
                this.clickBoostsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("CookieBoost", IsNullable = false)]
        public BoostClassBoostsCookieBoost[] CookieBoosts
        {
            get
            {
                return this.cookieBoostsField;
            }
            set
            {
                this.cookieBoostsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("CursorBoost", IsNullable = false)]
        public BoostClassBoostsCursorBoost[] CursorBoosts
        {
            get
            {
                return this.cursorBoostsField;
            }
            set
            {
                this.cursorBoostsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("GrandMaBoost", IsNullable = false)]
        public BoostClassBoostsGrandMaBoost[] GrandMaBoosts
        {
            get
            {
                return this.grandMaBoostsField;
            }
            set
            {
                this.grandMaBoostsField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class BoostClassBoostsClickBoost
    {

        private string nameField;

        private double priceField;

        private double multiplierField;

        private double indexField;

        private string quoteField;

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
        public double price
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

        /// <remarks/>
        public double multiplier
        {
            get
            {
                return this.multiplierField;
            }
            set
            {
                this.multiplierField = value;
            }
        }

        /// <remarks/>
        public double index
        {
            get
            {
                return this.indexField;
            }
            set
            {
                this.indexField = value;
            }
        }

        /// <remarks/>
        public string quote
        {
            get
            {
                return this.quoteField;
            }
            set
            {
                this.quoteField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class BoostClassBoostsCookieBoost
    {

        private string nameField;

        private double priceField;

        private double multiplierField;

        private double indexField;

        private string quoteField;

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
        public double price
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

        /// <remarks/>
        public double multiplier
        {
            get
            {
                return this.multiplierField;
            }
            set
            {
                this.multiplierField = value;
            }
        }

        /// <remarks/>
        public double index
        {
            get
            {
                return this.indexField;
            }
            set
            {
                this.indexField = value;
            }
        }

        /// <remarks/>
        public string quote
        {
            get
            {
                return this.quoteField;
            }
            set
            {
                this.quoteField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class BoostClassBoostsCursorBoost
    {

        private string nameField;

        private double priceField;

        private double multiplierField;

        private double indexField;

        private string quoteField;

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
        public double price
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

        /// <remarks/>
        public double multiplier
        {
            get
            {
                return this.multiplierField;
            }
            set
            {
                this.multiplierField = value;
            }
        }

        /// <remarks/>
        public double index
        {
            get
            {
                return this.indexField;
            }
            set
            {
                this.indexField = value;
            }
        }

        /// <remarks/>
        public string quote
        {
            get
            {
                return this.quoteField;
            }
            set
            {
                this.quoteField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class BoostClassBoostsGrandMaBoost
    {

        private string nameField;

        private double priceField;

        private double multiplierField;

        private double indexField;

        private string quoteField;

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
        public double price
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

        /// <remarks/>
        public double multiplier
        {
            get
            {
                return this.multiplierField;
            }
            set
            {
                this.multiplierField = value;
            }
        }

        /// <remarks/>
        public double index
        {
            get
            {
                return this.indexField;
            }
            set
            {
                this.indexField = value;
            }
        }

        /// <remarks/>
        public string quote
        {
            get
            {
                return this.quoteField;
            }
            set
            {
                this.quoteField = value;
            }
        }
    }

    public class BoostSerializer
    {
        public static BoostClass BoostDs()
        {
            BoostClass boosts = null;
            
            string path = @"C:\Users\Alexandre\source\repos\Cookie Clicker\Cookie Clicker+C#\App_Data/XMLboost.xml";

            XmlSerializer serializer = new XmlSerializer(typeof(BoostClass));
            StreamReader reader = new StreamReader(path);
            boosts = (BoostClass)serializer.Deserialize(reader);
            reader.Close();         
            return boosts;
        }
    }

}