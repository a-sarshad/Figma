\# Token Audit Plugin — Recreation Prompt

Copy and paste this entire prompt into Figma AI in your other account:

\---

Build me a plugin called "Token audit" that finds nodes with hardcoded spacing, radii, and border values not bound to design tokens — grouped by components, instances, and other layers — with locate and bulk fix.

\*\*How it works:\*\*

1\. User picks scope: "Page" or "Selection" (toggle buttons)  
2\. User picks audit type checkboxes: Spacing, Radii, Borders (all checked by default)  
3\. Optional checkbox: "Show approximate matches"  
4\. Click "Scan" to run the audit  
5\. Results are grouped into 3 collapsible categories: Component, Instance, Frame  
6\. Each group shows a badge with count of unique affected layers and a "Select group" button  
7\. Each issue shows: layer name, property name \+ current px value, suggested token name (with exact/approx badge)  
8\. Each issue has a locate button (crosshair icon) to zoom to that layer  
9\. For instances, show a link to the main component (diamond icon \+ clickable name)  
10\. Footer has: status label, "Scan" button, "Fix exact matches" button, "Fix approx to nearest" button  
11\. Fix buttons only fix components and "other" layers (not instances — fix at source)  
12\. "Select all" button at bottom selects all affected layers  
13\. When a group is selected, fix buttons scope to that group only

\*\*Token definitions to hardcode:\*\*

Spacing tokens (name, value in px, variable key):  
Spacing/0\_5=2px key:6dbdb338c17d501db08af05cc339bd0f1c28787a  
Spacing/1=4px key:df0fdc7fec80b264359690a3451306f1ca32e652  
Spacing/1\_5=6px key:dec74d1548fa36f4cc1d0399c118537553961ca3  
Spacing/2=8px key:ec060ae0e762c14da933942f7bd244f88da466b8  
Spacing/2\_5=10px key:6259c90df427c190dd0be097564b8f433e55fc4b  
Spacing/3=12px key:61df9f03fe33b39af5e333bf0dc638a59a533180  
Spacing/3\_5=14px key:d2e95f8c64bec01425c86270735d1474f48e20f4  
Spacing/4=16px key:835595d67642f435fecb3091f223287fb0dae57d  
Spacing/4\_5=18px key:3dc09b463cd9f42f8036f3d21e7db1db3aef9f14  
Spacing/5=20px key:ed277bd1ada6e44865aa77f11b536a283968ff0a  
Spacing/6=24px key:2dd0e914bf92169c2e5801f2caad33792be598f7  
Spacing/7=28px key:a4837f4ab06988ea9e2924b0b6157708ab7007af  
Spacing/8=32px key:278a496a3e97f664f6afa90a5a38f171ae16e48f  
Spacing/9=36px key:baa2eb20b67acd0dba9c13f11b890d1c492e56d9  
Spacing/10=40px key:b2fd3dc76a78f74cfd58cbae45d49531b9fe2339  
Spacing/11=44px key:be0de7f9ee56bc90407179d43b1bfd644ecc9063  
Spacing/12=48px key:91f22c5333e2f607c926ce3c40590e1031fa791b  
Spacing/14=56px key:954acb1e1f8c10be6bbc72d114704e0ff8263a48  
Spacing/16=64px key:c59898ccc22f1e78a769a1031503a3d7c5cbbd53  
Spacing/20=80px key:4d0039dfa92beda267e2c31feaa72d1e4bfab55c  
Spacing/24=96px key:7cf3f17fd34865a6e19b83d5fb1a7d9086c018e9  
Spacing/28=112px key:0db2b9c114b6af0ac5ccded09117b602caeb593e  
Spacing/32=128px key:f354efe72e6686bc9843d3c4df1298fd0bb21b61  
Spacing/36=144px key:d2cf4a45cb72757f2c65adae1ec7116497332422  
Spacing/40=160px key:7bcea7f93bf765b8129253262032247387ed4f66  
Spacing/44=176px key:3ed81df593757d0d74de25c350357474c0bdef1b  
Spacing/48=192px key:4ab75edbd9a1f3f94dfb3b0b8528e0bde0fbedf6  
Spacing/52=208px key:29e5294fba72a2b7d045191f61b286eebb77e533  
Spacing/56=224px key:b94178b61a2d79445ed79b62a42941101ae4200a  
Spacing/60=240px key:c1a37858e64ccf451533a06a6074623ab8a6d0f7  
Spacing/64=256px key:aa27cca07033dab9e8cd1070056bb1c49375f9fb  
Spacing/72=288px key:d55003544a168cabe8d02a6f59a3af5842e79e25  
Spacing/80=320px key:ddee0ec2c1856029b9a4e3a97e6548d47b598cac  
Spacing/96=384px key:6e81a0e6e001ae75018d16abde736c2dc9d417f8

Radii tokens:  
Radii/none=0px key:18d592224d5c79ab45fb36734f13298a8ca6edc8  
Radii/2xs=1px key:f82e496754dc88bfb7389ce227e81a50b4f63c08  
Radii/xs=2px key:1d5038f46ba34a604ce65702beb2e0971ccecd5d  
Radii/sm=4px key:7e9be8f201157da6d0bdad5098c4c4f86c935241  
Radii/md=6px key:043a181a0f6a1ab81bf2535da2e2443ab6249701  
Radii/lg=8px key:978af498136492ff9607ddc823d39d7070c88026  
Radii/xl=12px key:917a6c9b9b512efd3fb122f79d45471f8b59b75d  
Radii/2xl=16px key:e5959fb854fa0f5b5fee46a38b0a155c68586bba  
Radii/3xl=24px key:9bac066723c45e5d1fa8321397b8c7c51e369826  
Radii/4xl=32px key:20d3b15a1aab29b0f6f90bef4045f3fdc92ef260  
Radii/full=9999px key:2d99ef2977f305f358cf00afde93f44143aedb4e

Border tokens:  
Borders/xs=0.5px key:c9e1d0c805c7f18b271b00d4be004877ef10e797  
Borders/sm=1px key:13c7736099d5902bb835aa3f77dc2d29139cb428  
Borders/md=2px key:5fb2ec0ccb22736b4cc92bad275b7551ce960a60  
Borders/lg=4px key:36194991fe0642dd79863c9bbc8de59c57ff3bf5  
Borders/xl=6px key:8d6e00d2eec22511a34b5b45484c725a370f1c17

\*\*Audit logic:\*\*  
For spacing: check auto-layout frames for itemSpacing, paddingTop/Right/Bottom/Left, counterAxisSpacing — skip if value is 0 or already bound to a variable.  
For radii: check cornerRadius on rectangles/frames — skip if already bound.  
For borders: check strokeWeight on nodes with strokes — skip if already bound.  
For each unbound value, find the closest matching token. If exact match, mark "exact". Otherwise "approximate".

\*\*Fix logic:\*\*  
Use figma.variables.importVariableByKeyAsync(key) to import the variable, then node.setBoundVariable(property, variable) to bind it. Only fix components and "other" category (not instances).

\*\*UI details:\*\*  
Plugin width: 320px. Scope toggle: two buttons (Page/Selection), Selection active by default. Scan button disabled when scope is Selection and nothing is selected. Results grouped in collapsible sections (collapsed by default) with chevron, group name, count badge, and "Select group" button. "Expand all / Collapse all" toggle. Each issue row: layer name, property+value, suggested token badge (green for exact, orange for approx), locate button, component button for instances. Instance issues show clickable link to main component.