using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CarRentalSystem
{
    public partial class splash : Form
    {
        public splash()
        {
            InitializeComponent();
        }

        int startPoint = 0;
        private void timer1_Tick(object sender, EventArgs e)
        {
            startPoint  +=  1;
            MyProgress.Value = startPoint ;
            Percentage.Text = "" +startPoint + "%";
            if (MyProgress.Value == 100)
            {
                MyProgress.Value = 0;
                timer1.Stop();
                Login log = new Login();
                log.Show();

                this.Hide();
            } 
        }

        private void splash_Load(object sender, EventArgs e)
        {
            timer1.Start();
        }
    }
}
