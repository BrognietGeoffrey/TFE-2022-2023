import React, { useState } from 'react';
import { Card } from 'primereact/card';
import {TabView, TabPanel} from 'primereact/tabview';
const HelpPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleCardClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>

      <div className="card-container">
        <Card title="Ajout d'un facturier" onClick={() => handleCardClick(0)} id="cardAide">
          <TabView >
            <TabPanel header="Comment faire ?">
              <div>
                <span>Pour ajouter un facturier, il vous suffit d'être connectez avec un compte administrateur ou modérateur.</span>
                <br/>
                <span>Ensuite, vous devez cliquer sur le bouton 'Ajouter un facturier' dans la page 'Facturiers'.</span>
                <br/>
                <span>Ensuite vous devez cliquez sur le bouton "Ajout d'un facturier" et remplir les champs demandés.</span>
                <br/>
                <span>Une fois les champs remplis, vous devez cliquer sur le bouton de confirmation des données et enfin cliquez sur le bouton "Ajouter". 
                </span>
              <br/>
              <span>Vous pouvez également pré-remplir les champs grâce à une photo ou un document. Pour cela vous devez cliqué sur "Choose a file", puis importer. </span>

              </div>
            </TabPanel>
            <TabPanel header="Vidéo explicative">
              <div>
                <h3>Vidéo explicative</h3>
                <iframe width="1100" height="620" src="https://www.youtube.com/embed/tb1uF6cXjhw?cc_load_policy=1&cc_lang_pref=fr"  title="Ajout d&#39;un facturier" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </TabPanel>
          </TabView>
        </Card>

        <br/>

        <Card title="Consulter la base de données" onClick={() => handleCardClick(0)} id="cardAide">
          <TabView>
            <TabPanel header="Comment faire ?">
              <div>
                <span>Afin de voir ce qu'il y a dans la base de données, vous pouvez vous rendre dans l'onglet "Base de données" dans la barre de navigation.</span>
                <br/>
                <span>Une fois la, vous aurez le choix entre voir tous les extraits, toutes les factures, tous les clients et tous les fournisseurs</span>
                <br/>
                <span>Vous pouvez également faire une recherche dans la barre de recherche en haut à droite de la page.</span>
                <br/>
                <span>Et enfin, vous pouvez modifier les éléments de la base de données. En ce qui concerne les factures, tout est modifiable sauf le statut qui se modifie dans le facturier même.</span>

              </div>
            </TabPanel>
            <TabPanel header="Vidéo explicative">
              <div>
                <h3>Vidéo explicative</h3>
                <iframe width="1100" height="620" src="https://www.youtube.com/embed/j69ecT7DMrY?cc_load_policy=1&cc_lang_pref=fr" title="Consulter la base de données" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>              
                </div>
            </TabPanel>
          </TabView>
        </Card>

        <br/>

        <Card title="Ajouter un nouvel utilisateur" onClick={() => handleCardClick(0)} id="cardAide">
          <TabView>
            <TabPanel header="Comment faire ?">
              <div>
                <span>Pour ajouter un nouvel utilisateur, vous pouvez vous rendre dans le profil d'un compte administrateur. Une fois là, vous pouvez cliquer sur le bouton "Ajouter un utilisateur".  </span>
                <br/>
                <span>Ensuite, vous devez remplir les champs demandés. Vous pouvez également lier cet utilisateur à un compte client. Pour ce faire vous pouvez cliquer sur le bouton "Appuyer pour lier l'utilisateur à un compte client".</span>

              </div>
            </TabPanel>
            <TabPanel header="Vidéo explicative">
              <div>
                <h3>Vidéo explicative</h3>
                <iframe width="1100" height="620" src="https://www.youtube.com/embed/Ig1dS8ZuF1Q?cc_load_policy=1&cc_lang_pref=fr" title="Ajouter un utilisateur" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>               
                 </div>
            </TabPanel>
          </TabView>
        </Card>

        <br/>

        <Card title="Créer une vue" onClick={() => handleCardClick(0)} id="cardAide">
          <TabView>
            <TabPanel header="Comment faire ?">
              <div>
                <span>Une vue est un tri dans une base de données. Elle permet de créer des tableaux virtuels avec le tri choisis.</span>
                <br/>
                <span>Pour créer une vue, vous devez vous rendre dans la page "Analyse". Vous verrez un onglet "Vues".</span>
                <br/>
                <span>Une fois là, vous pouvez indiquer le nom de la vue, sur quelles données faire le trie, comment faire le tri et enfin vous pouvez créer la vue. </span>

              </div>
            </TabPanel>
            <TabPanel header="Vidéo explicative">
              <div>
                <h3>Vidéo explicative</h3>
                <iframe width="1440" height="620" src="https://www.youtube.com/embed/f30USUh1MlY?cc_load_policy=1&cc_lang_pref=fr" title="Création d&#39;une vue" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                 </div>
            </TabPanel>
          </TabView>
        </Card>


      </div>
    </div>
  );
};

export default HelpPage;



